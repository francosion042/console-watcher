import { ConfigType, SyncToCloudConfigType } from './types';
import GlobalErrorHandler from './errors/GlobalErrorHandler';
declare class ConsoleWatcher extends GlobalErrorHandler {
    private nativeConsoleMethods;
    private printInConsole;
    private saveToFile;
    private logFilePath;
    /**
     *
     * @param {object} config
     * @param {boolean} config.printInConsole - Optional - defaults to true
     * @param {boolean} config.saveToFile - Optional - defaults to true
     * @param {string} config.logFilePath - Optional - accepts ['.log', '.txt', '.json'] files - defaults to 'consoleWatcher.log'
     */
    constructor(config?: ConfigType);
    private overrideConsoleMethods;
    private formatArgsAsObject;
    private saveLogToFile;
    /**
     * @description Users who wish to have their logs where it'd be easier for them to see can create an account on the console watcher web platform
     * the logs are encrypted and stored on the database and can only be decrypted by the user on the frontend.
     * @param {object} config
     * @param {string} config.apiKey
     * @param {string} config.applicationKey
     * @param {string} config.encryptionKey - A Key private to you, do not lose or change this key to avoid losing already encrypted data.
     */
    syncToConsoleWatcherCloud(config: SyncToCloudConfigType): Promise<void>;
    /**
     * @description Registers a global error handler for the library. This handler will be called with any errors that occur, allowing users to customize error handling.
     * @param handler A callback function that will be invoked with the error object when an error occurs.
     */
    registerGlobalErrorHandler(handler: (error: any) => void): void;
}
export default ConsoleWatcher;
