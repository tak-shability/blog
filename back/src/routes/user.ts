require('dotenv').config();
import express from 'express';
import db from '../DBindex';
import cryptojs from 'crypto-js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/users/signup', async (req, res) => {
  const { userID, password } = req.body;
  console.log('req.body === ', req.body);
  try {
    const privateKey: string | undefined = process.env.SECRET_KEY;
    const encrypted = cryptojs.AES.encrypt(JSON.stringify(password), privateKey!).toString();
    await db.query(
      'insert into users(userID, password) values(?, ?)',
      [userID, encrypted],
      (error: string, result: string) => {
        if (error) {
          return res.status(401).json({
            result: false,
            message: '중복된 아이디가 있습니다. 다시 가입해주세요.',
          });
        }
        res.status(201).json({
          result: true,
        });
      },
    );
  } catch (error) {
    res.status(401).json({
      result: false,
      message: 'error occurred during the signup',
    });
  }
});

router.post('/users/login', async (req, res) => {
  const { userID, password } = req.body;
  try {
    const privateKey: string | undefined = process.env.SECRET_KEY;
    await db.query(
      'select * from users where userID=?',
      userID,
      (error: string, result: [{ id: number; userID: string; password: string }]) => {
        if (result.length < 1) {
          return res.status(400).json({
            result: false,
            message: '존재하지 않는 회원입니다.',
          });
        }
        const bytes = cryptojs.AES.decrypt(result[0].password, privateKey!);
        const decrypted = JSON.parse(bytes.toString(cryptojs.enc.Utf8));
        if (password === decrypted) {
          const token = jwt.sign(
            {
              userID: result[0].id,
            },
            process.env.TOKEN_SECRET_KEY!,
          );

          req.session.save(() => {
            console.log(req.session);
            console.log(req.sessionID);
            console.log('session 저장 완료');
          });

          res.status(200).json({
            result: true,
            token: token,
          });
        } else {
          res.status(400).json({
            result: false,
            message: '비밀번호가 틀립니다. 다시 확인해주세요.',
          });
        }
      },
    );
  } catch (error) {
    res.status(400).json({
      result: false,
      message: 'error occurred during the signin',
    });
  }
});

export default router;
