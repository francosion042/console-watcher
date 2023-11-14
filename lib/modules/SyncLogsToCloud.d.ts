import GlobalErrorHandler from '../errors/GlobalErrorHandler';
declare class SyncLogsToCloud extends GlobalErrorHandler {
    constructor();
    post(data: string, apiKey: string, appKey: string): Promise<boolean>;
}
declare const _default: SyncLogsToCloud;
export default _default;
