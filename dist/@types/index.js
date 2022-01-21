"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_router_1 = __importDefault(require("../router/users-router"));
const app = (0, express_1.default)();
app.use(express_1.default.json);
app.use(express_1.default.urlencoded({ extended: true }));
app.use(users_router_1.default);
users_router_1.default.get('/users/:uuid', (req, res, next) => {
    const uuid = req.params.uuid;
    res.status(StatusCodes.CREATED).send({ uuid });
});
app.listen(3000, () => {
    console.log('aplicação executando na porta 3000');
});
