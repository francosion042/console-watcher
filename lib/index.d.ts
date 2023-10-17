import { ConfigType } from './types';
declare class ConsoleWatcher {
    private nativeConsoleLog;
    private nativeConsoleInfo;
    private nativeConsoleError;
    private printInConsole;
    private saveToFile;
    private logFilePath;
    constructor(config?: ConfigType);
    private overrideConsoleLog;
    private overrideConsoleInfo;
    private overrideConsoleError;
    private saveLogToFile;
}
export default ConsoleWatcher;
