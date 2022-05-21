import { Request, Response } from "express";
import { ReturnUserDataService } from "../services/ReturnUserDataService";

class ReturnUserDataController {
  async handle(request: Request, response: Response) {
    const { authorization } = request.headers;

    const returnUserDataService = new ReturnUserDataService();

    const [, token] = authorization.split(" ");

    const user = await returnUserDataService.execute(token);

    return response.json(user);
  }
}

export { ReturnUserDataController };
