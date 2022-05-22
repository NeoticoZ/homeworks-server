import dayjs from "dayjs";
import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { exp } = decode(token, { json: true });
    const isExpired = dayjs().isAfter(dayjs.unix(exp));

    if (isExpired) {
      throw new Error("Token expirado");
    }

    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    request.user_id = sub;

    return next();
  } catch (err) {
    return response
      .status(401)
      .json({ error: true, code: "token.invalid", message: "Token inválido" })
      .end();
  }
}
