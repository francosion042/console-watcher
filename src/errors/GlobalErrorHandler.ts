class GlobalErrorHandler {
  private static globalErrorHandler: (error: Error) => void;

  static registerGlobalErrorHandler(handler: (error: Error) => void) {
    this.globalErrorHandler = handler;
  }

  protected handleError(error: any) {
    if (GlobalErrorHandler.globalErrorHandler) {
      GlobalErrorHandler.globalErrorHandler(error);
    } else {
      // Optional: default behavior if no handler is registered
      console.error('Unhandled error:', error);
    }
  }
}
export default GlobalErrorHandler