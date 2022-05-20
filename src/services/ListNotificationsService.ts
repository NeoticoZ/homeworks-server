import prismaClient from "../prisma";

class ListNotificationsService {
  async execute() {
    const notifications = await prismaClient.notification.findMany();

    return notifications;
  }
}

export { ListNotificationsService };
