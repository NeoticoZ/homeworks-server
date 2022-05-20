import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient, { exclude } from "../prisma";

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

    const token = sign(
      {
        email: userData.email,
      },
      process.env.JWT_SECRET,
      {
        subject: userData.id,
        expiresIn: "1d",
      }
    );

    const userWithoutPassword = exclude(userData, "password");

    return {
      user: userWithoutPassword,
      token,
    };
  }
}

export { AuthenticateUserService };
