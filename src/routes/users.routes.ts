import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/userCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/userCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
usersRoutes.post("/", createUserController.handle);

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));
const updateUserAvatarController = new UpdateUserAvatarController();
usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export { usersRoutes };
