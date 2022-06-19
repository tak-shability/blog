import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(400).json({ result: false, message: '접근권한이 없습니다. 로그인 후 사용하세요.1' });

  const [tokenType, tokenValue] = authorization!.split(' ');

  if (tokenType !== 'Bearer') {
    return res.status(401).json({
      result: false,
      message: '접근권한이 없습니다. 로그인 후 사용하세요.',
    });
  }

  try {
    res.locals.user = await jwt.verify(tokenValue, process.env.TOKEN_SECRET_KEY!);
    next();
  } catch (error) {
    return res.status(401).json({
      result: false,
      message: '접근권한이 없습니다. 로그인 후 사용하세요.',
    });
  }
};

export default auth;
