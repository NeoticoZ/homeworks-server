import { Request, Response } from "express";
import { UpdateTaskStatusService } from "../services/UpdateTaskStatusService";

class UpdateTaskStatusController {
  async handle(request: Request, response: Response) {
    const { taskId, status } = request.body;

    const updateTaskStatusService = new UpdateTaskStatusService();

    const task = await updateTaskStatusService.execute({ taskId, status });

    return response.json(task);
  }
}

export { UpdateTaskStatusController };
