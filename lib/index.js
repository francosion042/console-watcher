"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var SaveLogToFile_1 = __importDefault(require("./modules/SaveLogToFile"));
var ConsoleWatcher = /** @class */ (function () {
    function ConsoleWatcher(config) {
        if (config === void 0) { config = {}; }
        // Store the original console functions to restore their functionality later
        this.nativeConsoleLog = console.log;
        this.nativeConsoleInfo = console.info;
        this.nativeConsoleError = console.error;
        // Set configuration options, default to true if not provided
        this.printInConsole =
            config.printInConsole === undefined ? true : config.printInConsole;
        this.saveToFile = config.saveToFile === undefined ? true : config.saveToFile;
        // Set log file path and validate its type, default to 'consoleWatcher.log' if not provided
        this.logFilePath =
            (config.logFilePath && (0, utils_1.validateFileType)(config.logFilePath)) ||
                'consoleWatcher.log';
        // Override the native console functions to provide custom behavior
        this.overrideConsoleLog();
        this.overrideConsoleInfo();
        this.overrideConsoleError();
    }
    // Override the console.log method
    ConsoleWatcher.prototype.overrideConsoleLog = function () {
        var _this = this;
        console.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // Format the arguments for logging
            var logData = _this.formatArgsAsObject(args, 'log');
            // If saving to file is enabled, save the log
            if (_this.saveToFile) {
                _this.saveLogToFile(logData);
            }
            // If printing to console is enabled, display the log
            if (_this.printInConsole) {
                _this.nativeConsoleLog.apply(_this, args);
            }
        };
    };
    // Override the console.info method
    ConsoleWatcher.prototype.overrideConsoleInfo = function () {
        var _this = this;
        console.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var logData = _this.formatArgsAsObject(args, 'info');
            if (_this.saveToFile) {
                _this.saveLogToFile(logData);
            }
            if (_this.printInConsole) {
                _this.nativeConsoleInfo.apply(_this, args);
            }
        };
    };
    // Override the console.error method
    ConsoleWatcher.prototype.overrideConsoleError = function () {
        var _this = this;
        console.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var logData = _this.formatArgsAsObject(args, 'error');
            if (_this.saveToFile) {
                _this.saveLogToFile(logData);
            }
            if (_this.printInConsole) {
                _this.nativeConsoleError.apply(_this, args);
            }
        };
    };
    // Format console arguments into a structured log entry
    ConsoleWatcher.prototype.formatArgsAsObject = function (args, type) {
        var logEntry = {
            timestamp: new Date().toISOString(),
            type: type,
            messages: args,
        };
        return logEntry;
    };
    // Save the structured log entry to a file
    ConsoleWatcher.prototype.saveLogToFile = function (logData) {
        var logFileType = (0, utils_1.getFileType)(this.logFilePath);
        if (logFileType === 'json') {
            SaveLogToFile_1.default.appendToJSONFile(this.logFilePath, logData);
        }
        else {
            SaveLogToFile_1.default.appendToNonJSONFile(this.logFilePath, logData);
        }
    };
    return ConsoleWatcher;
}());
exports.default = ConsoleWatcher;
