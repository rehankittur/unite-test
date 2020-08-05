import { Request, Response,NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import * as Jimp from 'jimp';
import {
    BlobServiceClient,
    StorageSharedKeyCredential,
    generateBlobSASQueryParameters,
    BlobSASPermissions,
    SASProtocol
} from '@azure/storage-blob';
const stream = require('stream');

import SecretClientService from '../services/secret-client.service';
import StorageClientService from '../services/storage-client.service';
import { IMAGE_PROCESS_ROUTES } from '../routes/constants';
const keyVaultName = process.env['KEY_VAULT_NAME'];

class ImageProcessController implements Controller {
    public path = '/checkin';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path + IMAGE_PROCESS_ROUTES.TEST, this.routeCheck);
        this.router.get(this.path + IMAGE_PROCESS_ROUTES.HEALTH_CHECK, this.healthCheck);
        this.router.get(this.path + IMAGE_PROCESS_ROUTES.GENERATE_SAS_TOKEN, this.getSasToken);
        this.router.post(this.path + IMAGE_PROCESS_ROUTES.GET_CUSTOMER_IMAGE, this.getCustomerImage);
        this.router.post(this.path + IMAGE_PROCESS_ROUTES.SAVE_CUSTOMER_IMAGE, this.postCustomerImage);
    }
    private routeCheck = async (request: Request, response: Response) => {
        response.json({
            success: true,
            message: 'Api is ready!!'
        });
    }

    private healthCheck = async (request: Request, response: Response) => {
        try {
            const secretClient = SecretClientService.getInstance();
            const healthCheck = await secretClient.getSecret('healthCheck');
            response.json({
                keyVaultName,
                success: true,
                secretValue: healthCheck.value
            });
        }
        catch(e) {
            response.json({
                keyVaultName,
                error: true,
                message: JSON.stringify(e.message)
            });
        }
    }
    
    private getCustomerImage = async (request: Request, response: Response) => {
        /*
        const accountName = "jsnttstorage";
        const accountKey = "HTujKoqVR90TvicTss87rg0f44UUMtMQ9UpW9MflEutZTWBt/GhZoIQ4vL/dNFL91/ceuy1/rEnD9SzRRkrHTw==";
        //const secretname = 'demo-secret';
        //const res = await SecretClientService.getInstance().getSecret(secretname);
        const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
        const blobServiceClient = new BlobServiceClient(
            // When using AnonymousCredential, following url should include a valid SAS or support public access
            `https://${accountName}.blob.core.windows.net`,
            sharedKeyCredential
        );
        const containerClient = blobServiceClient.getContainerClient("imagecontainer");
        //const blockBlobClient = containerClient.getBlockBlobClient("img212.jpg");

        let blobs = containerClient.listBlobsFlat();
        let i =0;
        for await (const blob of blobs) {
            console.log(`Blob ${i++}: ${blob.name}`);
        }
       // const blobClient = containerClient.getBlobClient("blobName");
       */
        response.json({
            message: 'Get Customer Image work-in-progress '
        });
    }
    private getSasToken = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { img, customerid } = request.query;
            const blobName = customerid + "/" + img;
            const { storageName, storageKey, storageContainer } = await SecretClientService.getStorageKeyValue();
            const sharedKeyCredential = new StorageSharedKeyCredential(storageName, storageKey);
            const sasToken = this.createSharedAccessToken(
                storageContainer,
                blobName,
                sharedKeyCredential,
                null
            );
            response.json({
                sas: sasToken
            });
        }
        catch(e) {
            response.json({
                error: JSON.stringify(e)
            });
        }
    }

    private postCustomerImage = async (request: Request, response: Response, next: NextFunction) => {
        response.setHeader('Content-Type', 'application/json');
        let blockBlobClient;
        try {
            const { fields, files } = request;
            const { storageName, storageKey, storageContainer} = await SecretClientService.getStorageKeyValue();
            if(storageName && storageKey && fields.customerid) {
                    const thumbnailBuffer = await this.getImageBuffer(files.photo.path);
                    const sharedKeyCredential = StorageClientService.getSharedCredential(storageName, storageKey);
                    const sasToken = this.createSharedAccessToken(
                        storageContainer,
                        fields.customerid + "/" + files.photo.name,
                        sharedKeyCredential,
                        null
                    );
                    const blobServiceClient = StorageClientService.getInstance(storageName, storageKey)
                    blockBlobClient = await this.saveImageToBlobStorage(
                        fields.customerid,
                        files.photo.name,
                        blobServiceClient,
                        thumbnailBuffer,
                        storageContainer
                    );
                    const blobUrl = blockBlobClient ? blockBlobClient.url : "";
                    response.json({
                        sasTokenUrl: `${blobUrl}?${sasToken}`,
                        planDBUrl: blobUrl
                    });
            }
            else {
                response.json({
                    message: "Please provide valid input.."
                });
            }
            
        }
        catch(e) {
            console.log('3333', e)
            response.json({
                error: true,
                message: "Something went wrong "
            })
        }
    }

    private async saveImageToBlobStorage(
        customerId,
        imageName,
        blobServiceClient,
        thumbnailBuffer,
        storageContainer
    ) {
        try {
            const readStream = stream.PassThrough();
            readStream.end(thumbnailBuffer);

            const containerClient = blobServiceClient.getContainerClient(storageContainer);
            //const blockBlobClient = containerClient.getBlockBlobClient(customerId + "/" + imageName);
            const blockBlobClient = containerClient.getBlockBlobClient(customerId+"/"+imageName);

            await blockBlobClient.uploadStream(readStream, thumbnailBuffer.length);
            return blockBlobClient;
        }
        catch (e) {
            console.log("1111  ", e)
        }
        return null;
    }

    private createSharedAccessToken(storageContainer, blobName, sharedKeyCredential, permissions) { 
        let sasToken:string;
        const startDate = new Date();
        const expiryDate = new Date();
        startDate.setTime(startDate.getTime() - 5*60*1000);
        expiryDate.setTime(expiryDate.getTime() + 24*60*60*1000);
        const permissionType:string = permissions ? permissions : 'r';
        const permissionPolicy:any = BlobSASPermissions.parse(permissionType).toString();
        try {
            sasToken = generateBlobSASQueryParameters({
                containerName: storageContainer,
                protocol: SASProtocol.Https,
                blobName: blobName,
                permissions: permissionPolicy,
                startsOn: startDate,
                expiresOn: expiryDate,
                version: "2018-11-09"
              }, sharedKeyCredential).toString();
        }
        catch(e) {
            console.log("22222  ", e)
        }
        return sasToken
    }
    private async getImageBuffer(imagePath) {
        try {
            const image = await Jimp.read(imagePath);
            await image.resize(500, Jimp.AUTO);
            const thumbnailBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
            return thumbnailBuffer;
        }
        catch (e) { }
        return null;
    }
}
export default ImageProcessController;