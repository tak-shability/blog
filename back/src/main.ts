require('dotenv').config();
import express from 'express';
import userRouter from './routes/user';
import articleRouter from './routes/article';
import db from './DBindex';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
const MySQLStore = require('express-mysql-session')(session);

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

const sessionStore = new MySQLStore({}, db);

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      secure: false,
    },
    store: sessionStore,
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
