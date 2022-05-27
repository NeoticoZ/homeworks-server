import prismaClient from "../prisma";
import dayjs from "dayjs";
import { sign } from "jsonwebtoken";

class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(1, "day").unix();

    const { id } = await prismaClient.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    const token = sign({}, process.env.JWT_SECRET, {
      subject: id,
      expiresIn: "30d",
    });

    return token;
  }
}

export { GenerateRefreshToken };
