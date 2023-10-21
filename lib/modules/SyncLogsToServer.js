"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var https_1 = require("https");
var SyncLogsToServer = /** @class */ (function () {
    function SyncLogsToServer() {
        this.apiUrl = new URL('https://api-endpoint.com/logs');
    }
    SyncLogsToServer.prototype.post = function (data, apiKey, appId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var options = {
                method: 'POST',
                hostname: _this.apiUrl.hostname,
                path: _this.apiUrl.pathname,
                headers: {
                    'Api-Key': apiKey,
                    'Application-Id': appId,
                    'Content-Type': 'text/plain',
                    'Content-Length': data.length,
                },
            };
            var req = (0, https_1.request)(options, function (res) {
                var responseData = '';
                res.on('data', function (chunk) {
                    responseData += chunk;
                });
                res.on('end', function () {
                    resolve(responseData);
                });
            });
            req.on('error', function (error) {
                reject(error);
            });
            req.write(data);
            req.end();
        });
    };
    return SyncLogsToServer;
}());
exports.default = new SyncLogsToServer();
