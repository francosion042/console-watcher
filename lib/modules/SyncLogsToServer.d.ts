import GlobalErrorHandler from '../errors/GlobalErrorHandler';
declare class SyncLogsToServer extends GlobalErrorHandler {
    constructor();
    post(data: string, apiKey: string, appKey: string): Promise<boolean>;
}
declare const _default: SyncLogsToServer;
export default _default;
