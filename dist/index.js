"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const server_1 = require("./server");
const PORT = process.env.PORT || 5000;
server_1.server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
