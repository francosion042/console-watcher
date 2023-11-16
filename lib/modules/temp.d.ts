import GlobalErrorHandler from '../errors/GlobalErrorHandler';
declare class ReadLogsFromFile extends GlobalErrorHandler {
    constructor();
    nonJson(filePath: string): object[];
    json(filePath: string): object[];
}
declare const _default: ReadLogsFromFile;
export default _default;
