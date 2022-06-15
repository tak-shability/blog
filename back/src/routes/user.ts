require('dotenv').config();
import express from 'express';
import db from '../DBindex';
import cryptojs from 'crypto-js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/users/signup', async (req, res) => {
  const { userID, password } = req.body;
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

router.post('/users/signin', async (req, res) => {
  const { userID, password } = req.body;
  console.log('userID === ', userID);
  try {
    const decryptedPassword = await db.query(
      'select * from users where userID=?',
      userID,
      (error: string, result: [{ id: number; userID: string; password: string }]) => {
        const bytes = cryptojs.AES.decrypt(result[0].password, process.env.SECRET_KEY!);
        console.log('bytes === ', bytes);
        return JSON.parse(bytes.toString(cryptojs.enc.Utf8));
      },
    );
    // console.log('decryptedPassword === ', decryptedPassword);
    await db.query(
      'select * from users where userID=?, password=?',
      [userID, decryptedPassword],
      (error: string, result: { id: number; userID: string; password: string }) => {
        if (!result) {
          return res.status(400).json({
            result: false,
            message: '존재하지 않는 회원입니다.',
          });
        }
        const token = jwt.sign(
          {
            userID: result.id,
          },
          process.env.TOKEN_SECRET_KEY!,
        );

        res.status(200).json({
          result: true,
          token: token,
        });
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
