import { Request, Response } from "express";
import { ListNotificationsService } from "../services/ListNotificationsService";

class ListNotificationsController {
  async handle(request: Request, response: Response) {
    const listNotificationsService = new ListNotificationsService();

    const notifications = await listNotificationsService.execute();

    return response.json(notifications);
  }
}

export { ListNotificationsController };
