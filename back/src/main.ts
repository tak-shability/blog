require('dotenv').config();
import express from 'express';
import userRouter from './routes/user';
import articleRouter from './routes/article';
import db from './DBindex';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
const fileStore = require('session-file-store')(session);
const MYSQLStore = require('express-mysql-session')(session);

const app = express();

db.connect();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

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

app.use(
  session({
    secret: 'hello',
    resave: false,
    saveUninitialized: true,
  }),
);

app.use('/api', [userRouter, articleRouter]);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`
  ################################################
  🛡️  Server listening...
  ################################################
`);
});
