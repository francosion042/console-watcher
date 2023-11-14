export interface ConfigType {
    printInConsole?: boolean;
    saveToFile?: boolean;
    logFilePath?: string;
}
export interface SyncToCloudConfigType {
    apiKey: string;
    applicationKey: string;
    encryptionKey: string;
}
