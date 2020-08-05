import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

const keyVaultName = process.env['KEY_VAULT_NAME'];
const keyVaultUri = `https://${keyVaultName}.vault.azure.net/`;

class SecretClientService {

    private static secretClient;
    public static getInstance() {
        if(!this.secretClient) {
            const credential = new DefaultAzureCredential();
            this.secretClient = new SecretClient(keyVaultUri, credential);
        }
        return this.secretClient;
    }

    public static getKeyVaultUri():string {
        return keyVaultUri;
    }

    public static async getStorageKeyValue(): Promise<{ storageName: string, storageKey: string, storageContainer:string}> {
        let storageName;
        let storageKey;
        let storageContainer;
        try {
                storageName = await this.getInstance().getSecret('stName');
                storageName = storageName.value;
                storageKey = await this.getInstance().getSecret('stKey');
                storageKey = storageKey.value;
                storageContainer = await this.getInstance().getSecret('stContainer');
                storageContainer = storageContainer.value;
        }
        catch (e) {}
        return {
            storageName,
            storageKey,
            storageContainer
        }
    }

}
export default SecretClientService;