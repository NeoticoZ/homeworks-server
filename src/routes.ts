import { Router } from "express";
import { AuthenticateUserController } from "./controller/AuthenticateUserController";
import { CreateNotificationController } from "./controller/CreateNotificationController";
import { CreateTaskController } from "./controller/CreateTaskController";
import { CreateUserController } from "./controller/CreateUserController";
import { ListNotificationsController } from "./controller/ListNotificationsController";
import { ListTasksController } from "./controller/ListTasksController";
import { ListUsersController } from "./controller/ListUsersController";
import { RefreshTokenController } from "./controller/RefreshTokenController";
import { ReturnUserDataController } from "./controller/ReturnUserDataController";
import { UpdateTaskStatusController } from "./controller/UpdateTaskStatusController";
import { ensureAdmin } from "./middleware/ensureAdmin";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createNotificationController = new CreateNotificationController();
const listNotificationsController = new ListNotificationsController();
const createTaskController = new CreateTaskController();
const listTasksController = new ListTasksController();
const updateTaskStatusController = new UpdateTaskStatusController();
const listUsersController = new ListUsersController();
const returnUserDataController = new ReturnUserDataController();
const refreshTokenController = new RefreshTokenController();

router.get(
  "/notifications",
  ensureAuthenticated,
  listNotificationsController.handle
);
router.get("/tasks", ensureAuthenticated, listTasksController.handle);
router.get(
  "/users",
  ensureAuthenticated,
  ensureAdmin,
  listUsersController.handle
);
router.get("/user", ensureAuthenticated, returnUserDataController.handle);

router.post("/register", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post(
  "/notification",
  ensureAuthenticated,
  ensureAdmin,
  createNotificationController.handle
);
router.post(
  "/task",
  ensureAuthenticated,
  ensureAdmin,
  createTaskController.handle
);
router.post("/refresh-token", refreshTokenController.handle);

router.patch("/task", ensureAuthenticated, updateTaskStatusController.handle);

export { router };
