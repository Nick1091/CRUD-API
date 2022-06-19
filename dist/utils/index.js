"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBody = exports.uuidValidateV4 = exports.getPORT = exports.getRespMessage = exports.getRespDataDelete = exports.getRespData = void 0;
const uuid_1 = require("uuid");
const uuid_2 = require("uuid");
const getRespData = (res, user, code) => {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(user));
};
exports.getRespData = getRespData;
const getRespDataDelete = (res, code) => {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    return res.end();
};
exports.getRespDataDelete = getRespDataDelete;
const getRespMessage = (res, messages, code) => {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: messages }));
};
exports.getRespMessage = getRespMessage;
const getPORT = () => {
    return process.env.PORT;
};
exports.getPORT = getPORT;
const uuidValidateV4 = (uuid) => {
    return (0, uuid_1.validate)(uuid) && (0, uuid_2.version)(uuid) === 4;
};
exports.uuidValidateV4 = uuidValidateV4;
const getBody = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                }
                catch (err) {
                    resolve(undefined);
                }
            });
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.getBody = getBody;
