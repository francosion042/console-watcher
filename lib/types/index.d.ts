export interface ConfigType {
    printInConsole?: boolean;
    saveToFile?: boolean;
    logFilePath?: string;
}
export interface SyncToServerConfigType {
    apiKey: string;
    applicationId: string;
    encryptionKey: string;
}
