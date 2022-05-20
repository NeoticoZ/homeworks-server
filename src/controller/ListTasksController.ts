import { Request, Response } from "express";
import { ListTasksService } from "../services/ListTasksService";

class ListTasksController {
  async handle(request: Request, response: Response) {
    const listTasksService = new ListTasksService();

    const tasks = await listTasksService.execute();

    return response.json(tasks);
  }
}

export { ListTasksController };
