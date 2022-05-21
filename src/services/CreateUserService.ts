import prismaClient, { exclude } from "../prisma";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { GenerateToken } from "../provider/GenerateToken";
import { GenerateRefreshToken } from "../provider/GenerateRefreshToken";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, password, admin = false }: IUserRequest) {
    if (!email) {
      throw new Error("O email é obrigatório");
    }

    const userAlreadyExists = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("O usuário já existe");
    }

    const hashedPassword = await hash(password, 8);

    const userData = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        admin,
      },
    });

    const generateToken = new GenerateToken();
    const token = await generateToken.execute(userData.id);

    const generateRefreshToken = new GenerateRefreshToken();
    const refresToken = await generateRefreshToken.execute(userData.id);

    const userWithoutPassword = exclude(userData, "password");

    return {
      user: userWithoutPassword,
      token,
      refreshToken: refresToken,
    };
  }
}

export { CreateUserService };
