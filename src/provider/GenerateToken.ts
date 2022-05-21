import { sign } from "jsonwebtoken";
import prismaClient from "../prisma";

class GenerateToken {
  async execute(userId: string) {
    const { email } = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });

    const token = sign(
      {
        email,
      },
      process.env.JWT_SECRET,
      {
        subject: userId,
        expiresIn: "60m",
      }
    );

    return token;
  }
}

export { GenerateToken };
