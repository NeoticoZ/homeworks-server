import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, admin } = request.body;

    const createUserService = new CreateUserService();

    try {
      const { token, user, refreshToken } = await createUserService.execute({
        name,
        email,
        password,
        admin,
      });
      return response.json({ token, user, refreshToken });
    } catch (err) {
      return response.status(401).json({ error: err.message });
    }
  }
}

export { CreateUserController };
