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
const auth_1 = __importDefault(require("../auth"));
const router = express_1.default.Router();
router.post('/articles/post', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, contents } = req.body;
    try {
        yield DBindex_1.default.query('insert into articles(title, contents) values (?, ?)', [title, contents], (error, result) => {
            res.status(201).json({
                result: true,
            });
        });
    }
    catch (error) {
        res.json(401).json({
            result: false,
            message: 'error occured during insert into database',
        });
    }
}));
exports.default = router;
