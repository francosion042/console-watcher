"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var utils_1 = require("../utils");
var ReadLogsFromFile = /** @class */ (function () {
    function ReadLogsFromFile() {
    }
    ReadLogsFromFile.prototype.nonJson = function (filePath) {
        try {
            var fileContent 
            // Check if the file exists
            = void 0;
            // Check if the file exists
            if (!fs.existsSync(filePath)) {
                return [];
            }
            else {
                fileContent = fs.readFileSync(filePath, 'utf8');
            }
            // Split the file content by newline to get individual JSON strings
            var jsonStrings = fileContent
                .split('\n')
                .filter(function (str) { return str.trim() !== ''; });
            var jsonObjects = jsonStrings.map(function (str) { return JSON.parse(str); });
            return jsonObjects;
        }
        catch (error) {
            (0, utils_1.errorHandler)(error);
            return [];
        }
    };
    ReadLogsFromFile.prototype.json = function (filePath) {
        try {
            var fileContent 
            // Check if the file exists
            = void 0;
            // Check if the file exists
            if (!fs.existsSync(filePath)) {
                return [];
            }
            else {
                fileContent = fs.readFileSync(filePath, 'utf8');
            }
            var parsedData = JSON.parse(fileContent);
            if (Array.isArray(parsedData)) {
                return parsedData;
            }
            else if (typeof parsedData === 'object') {
                return [parsedData];
            }
            else {
                return [];
            }
        }
        catch (error) {
            (0, utils_1.errorHandler)(error);
            return [];
        }
    };
    return ReadLogsFromFile;
}());
exports.default = new ReadLogsFromFile();
