import prismaClient from "../prisma";

interface ICreateNotificationRequest {
  title: string;
  description: string;
}

class CreateNotificationService {
  async execute({ title, description }: ICreateNotificationRequest) {
    if (!title || !description) {
      throw new Error("Titulo e descrição são obrigatórios");
    }

    const notification = await prismaClient.notification.create({
      data: {
        title,
        description,
      },
    });

    return notification;
  }
}

export { CreateNotificationService };
