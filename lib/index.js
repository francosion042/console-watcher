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
        // Stores the native console.log, console.info and console.error function in a variable.
        this.nativeConsoleLog = console.log;
        this.nativeConsoleInfo = console.info;
        this.nativeConsoleError = console.error;
        this.printInConsole =
            config.printInConsole === undefined ? true : config.printInConsole;
        this.saveToFile = config.saveToFile === undefined ? true : config.saveToFile;
        this.logFilePath =
            (config.logFilePath && (0, utils_1.validateFileType)(config.logFilePath)) ||
                'consoleWatcher.log';
        this.overrideConsoleLog();
        this.overrideConsoleInfo();
        this.overrideConsoleError();
    }
    ConsoleWatcher.prototype.overrideConsoleLog = function () {
        var _this = this;
        console.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var logData = _this.formatArgsAsObject(args, 'log');
            if (_this.saveToFile) {
                _this.saveLogToFile(logData);
            }
            if (_this.printInConsole) {
                _this.nativeConsoleLog.apply(_this, args);
            }
        };
    };
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
    ConsoleWatcher.prototype.formatArgsAsObject = function (args, type) {
        var logEntry = {
            timestamp: new Date().toISOString(),
            type: type,
            messages: args,
        };
        return logEntry;
    };
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
