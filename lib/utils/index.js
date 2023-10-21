"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.minutesToMilliseconds = exports.validateFileType = exports.getFileType = exports.decrypt = exports.encrypt = void 0;
var crypto_1 = __importDefault(require("crypto"));
var algorithm = 'aes-128-cbc';
var ivLength = 16;
var encrypt = function (text, encryptionKey) {
    var iv = crypto_1.default.randomBytes(ivLength);
    var cipher = crypto_1.default.createCipheriv(algorithm, Buffer.from(encryptionKey), iv);
    var encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};
exports.encrypt = encrypt;
var decrypt = function (text, encryptionKey) {
    var textParts = text.split(':');
    var iv = Buffer.from(textParts.shift(), 'hex');
    var encryptedText = Buffer.from(textParts.join(':'), 'hex');
    var decipher = crypto_1.default.createDecipheriv(algorithm, Buffer.from(encryptionKey), iv);
    var decrypted = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
    ]);
    return decrypted.toString();
};
exports.decrypt = decrypt;
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
var minutesToMilliseconds = function (minutes) {
    return minutes * 60 * 1000;
};
exports.minutesToMilliseconds = minutesToMilliseconds;
