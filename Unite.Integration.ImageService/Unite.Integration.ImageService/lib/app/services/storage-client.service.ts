import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

class StorageClientService {

    private static serviceClient;
    private static sharedKeyCredential;
    public static getSharedCredential(storageName: string, accountKey: string) {
        if (!this.sharedKeyCredential)
            this.sharedKeyCredential = new StorageSharedKeyCredential(storageName, accountKey)
        return this.sharedKeyCredential;
    }

    public static getInstance(storageName: string, storageKey: string) {
        if (!this.serviceClient) {
            // const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
            this.serviceClient = new BlobServiceClient(
                // When using AnonymousCredential, following url should include a valid SAS or support public access
                `https://${storageName}.blob.core.windows.net`,
                this.getSharedCredential(storageName, storageKey)
            );
        }
        return this.serviceClient;
    }
}
export default StorageClientService;