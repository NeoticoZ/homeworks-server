import { NextFunction, Request, Response } from "express";
import prismaClient from "../prisma";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request;

  const { admin } = await prismaClient.user.findUnique({
    where: {
      id: user_id,
    },
  });

  if (admin) {
    return next();
  }

  return response.status(401).json({ error: "Usuário não é administrador" });
}
