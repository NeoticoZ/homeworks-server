import dayjs from "dayjs";
import { decode } from "jsonwebtoken";
import prismaClient from "../prisma";
import { GenerateRefreshToken } from "../provider/GenerateRefreshToken";
import { GenerateToken } from "../provider/GenerateToken";

class RefreshTokenService {
  async execute(refresh_token: string) {
    const { sub } = decode(refresh_token, { json: true });

    const refreshToken = await prismaClient.refreshToken.findFirst({
      where: {
        id: sub,
      },
    });

    if (!refreshToken) {
      throw new Error("Refresh token inválido");
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    const generateToken = new GenerateToken();
    const token = await generateToken.execute(refreshToken.userId);

    if (refreshTokenExpired) {
      await prismaClient.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId,
        },
      });

      const generateRefreshToken = new GenerateRefreshToken();
      const newRefreshToken = await generateRefreshToken.execute(
        refreshToken.userId
      );

      return { token, refreshToken: newRefreshToken };
    }

    return { token };
  }
}

export { RefreshTokenService };
