"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const cluster_1 = __importDefault(require("cluster"));
const os_1 = require("os");
const process_1 = __importDefault(require("process"));
require("./models");
const numCPUs = (0, os_1.cpus)().length;
if (cluster_1.default.isPrimary) {
    console.log(`Master process started`);
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster_1.default.fork();
    });
    for (const id in cluster_1.default.workers) {
        cluster_1.default.workers[id]?.on('message', async (msg) => {
            const { workerId, command, data, id: userId } = msg;
            for (const id in cluster_1.default.workers) {
                if (id == workerId) {
                    cluster_1.default.workers[id]?.send({ command, data, id: userId });
                }
            }
        });
    }
}
else {
    const worker = cluster_1.default.worker;
    if (worker) {
        server_1.server.listen(4000, () => {
            console.log(`Server is running on port ${4000}`);
        });
        console.log(`Worker with pid ${process_1.default.pid} and id ${worker.id} has been started`);
    }
}
