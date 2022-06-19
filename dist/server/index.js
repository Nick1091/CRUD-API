"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const http_1 = __importDefault(require("http"));
const utils_1 = require("../utils");
const controllers_1 = require("../controllers");
const constants_1 = require("../constants");
exports.server = http_1.default.createServer((req, res) => {
    const url = req.url ? req.url.replace(/\/*$/g, "") : undefined;
    const isUser = url?.match(/\/api\/users\/([A-Za-z0-9])/);
    if (url === '/api/users' && req.method === "GET") {
        return (0, controllers_1.getUsers)(res);
    }
    else if (url && isUser && req.method === "GET") {
        const id = url.split('/')[3];
        if ((0, utils_1.uuidValidateV4)(id)) {
            return (0, controllers_1.getUser)(res, id);
        }
        else {
            return (0, utils_1.getRespMessage)(res, constants_1.messages.userInvalidUuid, constants_1.Codes.client400);
        }
    }
    else if (url === '/api/users' && req.method === 'POST') {
        return (0, controllers_1.createUser)(req, res);
    }
    else if (url && isUser && req.method === 'PUT') {
        const id = url.split('/')[3];
        if ((0, utils_1.uuidValidateV4)(id)) {
            return (0, controllers_1.putUser)(req, res, id);
        }
        else {
            return (0, utils_1.getRespMessage)(res, constants_1.messages.userInvalidUuid, constants_1.Codes.client400);
        }
    }
    else if (url && isUser && req.method === 'DELETE') {
        const id = url.split('/')[3];
        if ((0, utils_1.uuidValidateV4)(id)) {
            return (0, controllers_1.deleteUser)(res, id);
        }
        else {
            return (0, utils_1.getRespMessage)(res, constants_1.messages.userInvalidUuid, constants_1.Codes.client400);
        }
    }
    else {
        return (0, utils_1.getRespMessage)(res, constants_1.messages.routNotFound, constants_1.Codes.client404);
    }
});
