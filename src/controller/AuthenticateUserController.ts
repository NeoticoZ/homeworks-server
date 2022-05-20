import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    try {
      const { token, user } = await authenticateUserService.execute({
        email,
        password,
      });
      return response.json({ token, user });
    } catch (err) {
      return response.status(401).json({ error: err.message });
    }
  }
}

export { AuthenticateUserController };
