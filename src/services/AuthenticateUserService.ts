import { compare } from "bcryptjs";
import prismaClient, { exclude } from "../prisma";
import { GenerateRefreshToken } from "../provider/GenerateRefreshToken";
import { GenerateToken } from "../provider/GenerateToken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const userData = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!userData) {
      throw new Error("Usuário não encontrado");
    }

    const passwordMatch = await compare(password, userData.password);

    if (!passwordMatch) {
      throw new Error("Email ou senha incorreta");
    }

    const generateToken = new GenerateToken();
    const token = await generateToken.execute(userData.id);

    await prismaClient.refreshToken.deleteMany({
      where: {
        userId: userData.id,
      },
    });

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(userData.id);

    const userWithoutPassword = exclude(userData, "password");

    return {
      user: userWithoutPassword,
      token,
      refreshToken: refreshToken,
    };
  }
}

export { AuthenticateUserService };
