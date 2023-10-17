"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var utils_1 = require("./utils");
var ConsoleWatcher = /** @class */ (function () {
    function ConsoleWatcher(config) {
        if (config === void 0) { config = {}; }
        // Stores the native console.log, console.info and console.error function in a variable.
        this.nativeConsoleLog = console.log;
        this.nativeConsoleInfo = console.info;
        this.nativeConsoleError = console.error;
        this.printInConsole = config.printInConsole === undefined ? true : config.printInConsole;
        this.saveToFile = config.saveToFile === undefined ? true : config.saveToFile;
        this.logFilePath = config.logFilePath && (0, utils_1.validateFileType)(config.logFilePath) || 'consoleWatcher.log';
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
            args = args.map(function (arg) {
                if (typeof arg === 'object') {
                    return JSON.stringify(arg);
                }
                else {
                    return arg;
                }
            });
            // Saves to file if enabled in the config.
            if (_this.saveToFile) {
                _this.saveLogToFile(args.join(' '));
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
            args = args.map(function (arg) {
                if (typeof arg === 'object') {
                    return JSON.stringify(arg);
                }
                else {
                    return arg;
                }
            });
            // Saves to file if enabled in the config.
            if (_this.saveToFile) {
                _this.saveLogToFile(args.join(' '));
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
            args = args.map(function (arg) {
                if (typeof arg === 'object') {
                    return JSON.stringify(arg);
                }
                else {
                    return arg;
                }
            });
            // Saves to file if enabled in the config.
            if (_this.saveToFile) {
                _this.saveLogToFile(args.join(' '));
            }
            if (_this.printInConsole) {
                _this.nativeConsoleError.apply(_this, args);
            }
        };
    };
    ConsoleWatcher.prototype.saveLogToFile = function (logData) {
        fs_1.default.appendFileSync(this.logFilePath, logData + '\n\n');
    };
    return ConsoleWatcher;
}());
exports.default = ConsoleWatcher;
