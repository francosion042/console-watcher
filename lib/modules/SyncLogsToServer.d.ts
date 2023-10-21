declare class SyncLogsToServer {
    private apiUrl;
    post(data: string, apiKey: string, appId: string): Promise<any>;
}
declare const _default: SyncLogsToServer;
export default _default;
