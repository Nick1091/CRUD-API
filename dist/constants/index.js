"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = exports.Codes = void 0;
var Codes;
(function (Codes) {
    Codes[Codes["success200"] = 200] = "success200";
    Codes[Codes["success201"] = 201] = "success201";
    Codes[Codes["success204"] = 204] = "success204";
    Codes[Codes["serverCode"] = 500] = "serverCode";
    Codes[Codes["client400"] = 400] = "client400";
    Codes[Codes["client404"] = 404] = "client404";
})(Codes = exports.Codes || (exports.Codes = {}));
exports.messages = {
    serverError: 'The server is not responding',
    userError: 'User Not Found',
    userInvalidUuid: 'User id is not correct',
    badRequest: 'Bad request',
    fieldsReqErr: 'Request not valid',
    routNotFound: 'Rout Not Found'
};
