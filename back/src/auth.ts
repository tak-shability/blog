import { Request, Response, NextFunction } from 'express';
require('dotenv').config();

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { cookie } = req.headers;
  if (!cookie) {
    return res.status(400).json({ result: false, message: '접근권한이 없습니다. 로그인 후 사용하세요.' });
  }

  const [cookieName, cookieValue] = cookie.split('=');

  try {
    req.sessionID === cookieValue
      ? next()
      : res.status(401).json({
          result: false,
          message: '접근권한이 없습니다. 로그인 후 사용하세요.',
        });
  } catch (error) {
    return res.status(401).json({
      result: false,
      message: '접근권한이 없습니다. 로그인 후 사용하세요.',
    });
  }
};

export default auth;
