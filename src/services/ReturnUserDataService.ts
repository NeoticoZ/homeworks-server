import { decode } from "jsonwebtoken";
import prismaClient, { exclude } from "../prisma";

class ReturnUserDataService {
  async execute(token: string) {
    const { email } = decode(token, { json: true });

    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("O usuário não existe");
    }

    const userWithoutPassword = exclude(user, "password");

    return userWithoutPassword;
  }
}

export { ReturnUserDataService };
