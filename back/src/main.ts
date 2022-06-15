require('dotenv').config();
import express from 'express';
// import userRouter from './routes/user';
// import articleRouter from './routes/article';
import db from './DBindex';

const app = express();

db.connect();

// app.use('/api', [userRouter, articleRouter]);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`
  ################################################
  🛡️  Server listening...
  ################################################
`);
});
