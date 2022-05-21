import { Request, Response } from "express";
import { RefreshTokenService } from "../services/RefreshTokenService";

class RefreshTokenController {
  async handle(request: Request, response: Response) {
    const { refresh_token } = request.body;

    const refreshTokenService = new RefreshTokenService();

    try {
      const token = await refreshTokenService.execute(refresh_token);

      return response.json(token);
    } catch (err) {
      return response.status(401).json({ error: err.message });
    }
  }
}

export { RefreshTokenController };
