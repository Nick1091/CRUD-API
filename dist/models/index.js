"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class UsersService {
    constructor() {
        this.users = [];
    }
    async GetUsers() {
        return this.users;
    }
    async CreateUser(user) {
        const newUser = { id: (0, uuid_1.v4)(), ...user };
        this.users.push(newUser);
        return newUser;
    }
    async GetUserById(id) {
        return this.users.find((user) => user.id === id);
    }
    async DeleteUser(id) {
        this.users = this.users.filter((user) => user.id !== id);
    }
    async UpdateUser(user) {
        const ind = this.users.findIndex((us) => {
            us.id === user.id;
        });
        this.users.splice(ind, 1, user);
        return user;
    }
}
exports.default = new UsersService();
