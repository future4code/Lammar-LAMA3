"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./controller/app"));
const userRouter_1 = require("./routes/userRouter");
app_1.default.use("/user/", userRouter_1.userRouter);
//# sourceMappingURL=index.js.map