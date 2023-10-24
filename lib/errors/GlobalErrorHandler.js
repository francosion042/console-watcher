"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GlobalErrorHandler = /** @class */ (function () {
    function GlobalErrorHandler() {
    }
    GlobalErrorHandler.registerGlobalErrorHandler = function (handler) {
        this.globalErrorHandler = handler;
    };
    GlobalErrorHandler.prototype.handleError = function (error) {
        var _a, _b, _c;
        if (GlobalErrorHandler.globalErrorHandler) {
            GlobalErrorHandler.globalErrorHandler(error);
        }
        else {
            // Optional: default behavior if no handler is registered
            console.error("Unhandled error: ".concat((_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.statusText) !== null && _b !== void 0 ? _b : error.message) !== null && _c !== void 0 ? _c : 'Unknown'), error);
        }
    };
    return GlobalErrorHandler;
}());
exports.default = GlobalErrorHandler;
