"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFileType = exports.getFileType = void 0;
var getFileType = function (filePath) {
    var extension = filePath.slice(((filePath.lastIndexOf('.') - 1) >>> 0) + 2);
    return extension;
};
exports.getFileType = getFileType;
var validateFileType = function (filePath) {
    var allowedFileTypes = ['txt', 'log', 'json'];
    var fileType = (0, exports.getFileType)(filePath);
    return allowedFileTypes.includes(fileType) ? filePath : undefined;
};
exports.validateFileType = validateFileType;
