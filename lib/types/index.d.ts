export interface ConfigType {
    printInConsole?: boolean;
    saveToFile?: boolean;
    logFilePath?: string;
}
export interface SyncToServerConfigType {
    apiKey: string;
    applicationKey: string;
    encryptionKey: string;
}
