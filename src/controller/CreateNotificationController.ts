import { Request, Response } from "express";
import { CreateNotificationService } from "../services/CreateNotificationService";

class CreateNotificationController {
  async handle(request: Request, response: Response) {
    const { title, description } = request.body;

    const createNotificationService = new CreateNotificationService();

    const notification = await createNotificationService.execute({
      title,
      description,
    });

    return response.json(notification);
  }
}

export { CreateNotificationController };
