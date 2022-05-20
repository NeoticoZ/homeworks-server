import { Request, Response } from "express";
import { CreateTaskService } from "../services/CreateTaskService";

class CreateTaskController {
  async handle(request: Request, response: Response) {
    const { name, status, assignedTo } = request.body;

    const createTaskService = new CreateTaskService();

    const task = await createTaskService.execute({
      name,
      status,
      assignedTo,
    });

    return response.json(task);
  }
}

export { CreateTaskController };
