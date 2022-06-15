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
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const DBindex_1 = __importDefault(require("../DBindex"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post('/users/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, password } = req.body;
    try {
        const privateKey = process.env.SECRET_KEY;
        const encrypted = crypto_js_1.default.AES.encrypt(JSON.stringify(password), privateKey).toString();
        yield DBindex_1.default.query('insert into users(userID, password) values(?, ?)', [userID, encrypted], (error, result) => {
            if (error) {
                return res.status(401).json({
                    result: false,
                    message: '중복된 아이디가 있습니다. 다시 가입해주세요.',
                });
            }
            res.status(201).json({
                result: true,
            });
        });
    }
    catch (error) {
        res.status(401).json({
            result: false,
            message: 'error occurred during the signup',
        });
    }
}));
router.post('/users/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, password } = req.body;
    console.log('userID === ', userID);
    try {
        const decryptedPassword = yield DBindex_1.default.query('select * from users where userID=?', userID, (error, result) => {
            const bytes = crypto_js_1.default.AES.decrypt(result[0].password, process.env.SECRET_KEY);
            console.log('bytes === ', bytes);
            return JSON.parse(bytes.toString(crypto_js_1.default.enc.Utf8));
        });
        console.log('decryptedPassword === ', decryptedPassword);
        yield DBindex_1.default.query('select * from users where userID=?, password=?', [userID, decryptedPassword], (error, result) => {
            if (!result) {
                return res.status(400).json({
                    result: false,
                    message: '존재하지 않는 회원입니다.',
                });
            }
            const token = jsonwebtoken_1.default.sign({
                userID: result.id,
            }, process.env.TOKEN_SECRET_KEY);
            res.status(200).json({
                result: true,
                token,
            });
        });
    }
    catch (error) {
        res.status(400).json({
            result: false,
            message: 'error occurred during the signin',
        });
    }
}));
exports.default = router;
