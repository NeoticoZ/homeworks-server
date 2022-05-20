import prismaClient from "../prisma";

interface IUpdateTaskStatusRequest {
  taskId: string;
  status: string;
}

class UpdateTaskStatusService {
  async execute({ taskId, status }: IUpdateTaskStatusRequest) {
    const task = await prismaClient.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: status,
      },
    });

    return task;
  }
}

export { UpdateTaskStatusService };
