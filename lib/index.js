"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        return __awaiter(this, void 0, void 0, function () {
            var logFileType, logs, encryptedData, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Ensures saveToFile is set to true when calling this method
                        this.saveToFile = true;
                        // Validate the length of the encryptionKey
                        if (config.encryptionKey.length !== 16) {
                            throw new Error('Invalid encryptionKey length. Expected 16 characters.');
                        }
                        logFileType = (0, utils_1.getFileType)(this.logFilePath);
                        logs = [];
                        if (logFileType === 'json') {
                            logs = ReadLogsFromFile_1.default.json(this.logFilePath);
                        }
                        else {
                            logs = ReadLogsFromFile_1.default.nonJson(this.logFilePath);
                        }
                        if (!logs.length) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        encryptedData = (0, utils_1.encrypt)(JSON.stringify(logs), config.encryptionKey);
                        return [4 /*yield*/, SyncLogsToServer_1.default.post(encryptedData, config.apiKey, config.applicationKey)];
                    case 2:
                        response = _a.sent();
                        if (response) {
                            // Clear the logs in the file.
                            WriteLogToFile_1.default.clearFileContent(this.logFilePath);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ConsoleWatcher;
}());
exports.default = ConsoleWatcher;
