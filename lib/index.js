"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var WriteLogToFile_1 = __importDefault(require("./modules/WriteLogToFile"));
var ReadLogsFromFile_1 = __importDefault(require("./modules/ReadLogsFromFile"));
var SyncLogsToServer_1 = __importDefault(require("./modules/SyncLogsToServer"));
var ConsoleWatcher = /** @class */ (function () {
    /**
     *
     * @param {object} config
     * @param {boolean} config.printInConsole - Optional - defaults to true
     * @param {boolean} config.saveToFile - Optional - defaults to true
     * @param {string} config.logFilePath - Optional - accepts ['.log', '.txt', '.json'] files - defaults to 'consoleWatcher.log'
     */
    function ConsoleWatcher(config) {
        if (config === void 0) { config = {}; }
        // Native console methods references
        this.nativeConsoleMethods = {};
        // Store the original console functions to restore their functionality later
        this.nativeConsoleMethods = {
            log: console.log,
            info: console.info,
            error: console.error,
        };
        // Set configuration options, default to true if not provided
        this.printInConsole =
            config.printInConsole === undefined ? true : config.printInConsole;
        this.saveToFile = config.saveToFile === undefined ? true : config.saveToFile;
        // Set log file path and validate its type, default to 'consoleWatcher.log' if not provided
        this.logFilePath =
            (config.logFilePath && (0, utils_1.validateFileType)(config.logFilePath)) ||
                'consoleWatcher.log';
        // Override the native console functions to provide custom behavior
        this.overrideConsoleMethods();
    }
    ConsoleWatcher.prototype.overrideConsoleMethods = function () {
        var _this = this;
        ;
        ['log', 'info', 'error'].forEach(function (method) {
            console[method] = function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var logData = _this.formatArgsAsObject(args, method);
                if (_this.saveToFile) {
                    _this.saveLogToFile(logData);
                }
                if (_this.printInConsole) {
                    (_a = _this.nativeConsoleMethods)[method].apply(_a, args);
                }
            };
        });
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
            WriteLogToFile_1.default.appendToJSONFile(this.logFilePath, logData);
        }
        else {
            WriteLogToFile_1.default.appendToNonJSONFile(this.logFilePath, logData);
        }
    };
    /**
     * @description Users who wish to have their logs where it'd be easier for them to see can create an account on the console watcher web platform
     * the logs are encrypted and stored on the database and can only be decrypted by the user on the frontend.
     * @param {object} config
     * @param {string} config.apiKey
     * @param {string} config.applicationId
     * @param {string} config.encryptionKey - A Key private to you, do not lose or change this key to avoid losing already encrypted data.
     */
    ConsoleWatcher.prototype.syncToConsoleWatcherServer = function (config) {
        // Ensures saveToFile is set to true when calling this method
        this.saveToFile = true;
        // //////////////////////////
        var logFileType = (0, utils_1.getFileType)(this.logFilePath);
        var logs = [];
        if (logFileType === 'json') {
            logs = ReadLogsFromFile_1.default.json(this.logFilePath);
        }
        else {
            logs = ReadLogsFromFile_1.default.nonJson(this.logFilePath);
        }
        if (logs.length) {
            var encryptedData = (0, utils_1.encrypt)(JSON.stringify(logs), config.encryptionKey);
            try {
                SyncLogsToServer_1.default.post(encryptedData, config.apiKey, config.applicationId);
            }
            catch (error) {
                // Do Nothing
            }
        }
    };
    return ConsoleWatcher;
}());
exports.default = ConsoleWatcher;
