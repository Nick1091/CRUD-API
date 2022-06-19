"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const models_1 = __importDefault(require("../models"));
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const getUsers = async (res) => {
    try {
        await models_1.default.GetUsers();
        return (0, utils_1.getRespData)(res, models_1.default.users, constants_1.Codes.success200);
    }
    catch {
        return (0, utils_1.getRespMessage)(res, constants_1.messages.serverError, constants_1.Codes.serverCode);
    }
};
exports.getUsers = getUsers;
const getUser = async (res, id) => {
    try {
        const user = await models_1.default.GetUserById(id);
        if (user) {
            return (0, utils_1.getRespData)(res, user, constants_1.Codes.success200);
        }
        else {
            return (0, utils_1.getRespMessage)(res, constants_1.messages.userError, constants_1.Codes.client404);
        }
    }
    catch {
        return (0, utils_1.getRespMessage)(res, constants_1.messages.serverError, constants_1.Codes.serverCode);
    }
};
exports.getUser = getUser;
const createUser = async (req, res) => {
    try {
        const u = await (0, utils_1.getBody)(req);
        const { username, age, hobbies } = u ? u : { username: null, age: null, hobbies: null };
        if (u && typeof username === 'string' && typeof age === 'number' && Array.isArray(hobbies)) {
            const user = { username, age, hobbies };
            const newUsers = await models_1.default.CreateUser(user);
            return (0, utils_1.getRespData)(res, newUsers, constants_1.Codes.success201);
        }
        else {
            return (0, utils_1.getRespMessage)(res, constants_1.messages.fieldsReqErr, constants_1.Codes.client400);
        }
    }
    catch {
        return (0, utils_1.getRespMessage)(res, constants_1.messages.serverError, constants_1.Codes.serverCode);
    }
};
exports.createUser = createUser;
const putUser = async (req, res, id) => {
    try {
        const user = await models_1.default.GetUserById(id);
        const u = await (0, utils_1.getBody)(req);
        const { username, age, hobbies } = u ? u : { username: null, age: null, hobbies: null };
        if (user) {
            if (u && typeof username === 'string' && typeof age === 'number' && Array.isArray(hobbies)) {
                const us = { id, username, age, hobbies };
                const newUsers = await models_1.default.UpdateUser(us);
                return (0, utils_1.getRespData)(res, newUsers, constants_1.Codes.success200);
            }
            else {
                return (0, utils_1.getRespMessage)(res, constants_1.messages.fieldsReqErr, constants_1.Codes.client400);
            }
        }
        else {
            return (0, utils_1.getRespMessage)(res, constants_1.messages.userError, constants_1.Codes.client404);
        }
    }
    catch {
        return (0, utils_1.getRespMessage)(res, constants_1.messages.serverError, constants_1.Codes.serverCode);
    }
};
exports.putUser = putUser;
const deleteUser = async (res, id) => {
    try {
        const user = await models_1.default.GetUserById(id);
        if (user) {
            await models_1.default.DeleteUser(id);
            return (0, utils_1.getRespDataDelete)(res, constants_1.Codes.success204);
        }
        else {
            return (0, utils_1.getRespMessage)(res, constants_1.messages.userError, constants_1.Codes.client404);
        }
    }
    catch {
        return (0, utils_1.getRespMessage)(res, constants_1.messages.serverError, constants_1.Codes.serverCode);
    }
};
exports.deleteUser = deleteUser;
