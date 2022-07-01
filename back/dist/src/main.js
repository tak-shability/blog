"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const article_1 = __importDefault(require("./routes/article"));
const DBindex_1 = __importDefault(require("./DBindex"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const fileStore = require('session-file-store')(express_session_1.default);
const MYSQLStore = require('express-mysql-session')(express_session_1.default);
const app = (0, express_1.default)();
DBindex_1.default.connect();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
// app.use(cookieParser('secret'));
// app.use(
//   session({
//     name: 'mycookie',
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       httpOnly: true,
//       maxAge: 60000,
//     },
//     store: new MYSQLStore({}, db),
//   }),
// );
app.use((0, express_session_1.default)({
    secret: 'hello',
    resave: false,
    saveUninitialized: true,
}));
app.use('/api', [user_1.default, article_1.default]);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`
  ################################################
  🛡️  Server listening...
  ################################################
`);
});
