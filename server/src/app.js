"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Setup app
exports.app = (0, express_1.default)();
var _a = process.env, PORT = _a.PORT, NODE_ENV = _a.NODE_ENV;
// Global get route
exports.app.get('/', function (_req, res) {
    res.json('welcome to chat api');
});
// Listen to server
if (NODE_ENV !== 'test') {
    exports.app.listen(PORT, function () {
        console.log("Listening to port on port ".concat(PORT));
    });
}
