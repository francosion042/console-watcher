declare class GlobalErrorHandler {
    private static globalErrorHandler;
    static registerGlobalErrorHandler(handler: (error: Error) => void): void;
    protected handleError(error: any): void;
}
export default GlobalErrorHandler;
