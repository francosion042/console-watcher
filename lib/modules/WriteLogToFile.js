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
// Class responsible for appending data to JSON, text and log files.
var WriteLogToFile = /** @class */ (function () {
    function WriteLogToFile() {
    }
    WriteLogToFile.prototype.appendToNonJSONFile = function (filePath, obj) {
        var logData = JSON.stringify(obj);
        fs.appendFileSync(filePath, logData + '\n');
    };
    // Append an object to the target JSON file.
    WriteLogToFile.prototype.appendToJSONFile = function (filePath, obj) {
        var fileContent;
        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            fileContent = '[]';
        }
        else {
            fileContent = fs.readFileSync(filePath, 'utf8');
            // If the file is empty or invalid JSON, initialize an empty array
            try {
                JSON.parse(fileContent);
            }
            catch (e) {
                fileContent = '[]';
            }
        }
        // Parse the file content
        var data = JSON.parse(fileContent);
        // Append the object
        data.push(obj);
        // Write the updated content back to the file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    };
    WriteLogToFile.prototype.clearFileContent = function (filePath) {
        try {
            // Check if the file exists before trying to clear its content
            if (fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, '', 'utf8');
            }
        }
        catch (error) {
            (0, utils_1.errorHandler)(error);
        }
    };
    return WriteLogToFile;
}());
exports.default = new WriteLogToFile();
