"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(400).json({ result: false, message: '접근권한이 없습니다. 로그인 후 사용하세요.' });
    const [tokenType, tokenValue] = authorization.split(' ');
    if (tokenType !== 'Bearer') {
        return res.status(401).json({
            result: false,
            message: '접근권한이 없습니다. 로그인 후 사용하세요.',
        });
    }
    try {
        res.locals.user = yield jsonwebtoken_1.default.verify(tokenValue, process.env.TOKEN_SECRET_KEY);
        next();
    }
    catch (error) {
        return res.status(401).json({
            result: false,
            message: '접근권한이 없습니다. 로그인 후 사용하세요.',
        });
    }
});
exports.default = auth;
