import prismaClient from "../prisma";

interface ITaskRequest {
  name: string;
  status: string;
  assignedTo?: string;
}

class CreateTaskService {
  async execute({ name, status, assignedTo = "all" }: ITaskRequest) {
    if (!name) {
      throw new Error("Task name is required");
    }

    const task = await prismaClient.task.create({
      data: {
        name,
        status,
        assignedTo,
      },
    });

    return task;
  }
}

export { CreateTaskService };
