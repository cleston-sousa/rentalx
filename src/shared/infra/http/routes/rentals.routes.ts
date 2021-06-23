import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalByUserController } from "@modules/rentals/useCases/listRentalByUser/ListRentalByUserController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const listRentalByUserController = new ListRentalByUserController();

const createRentalController = new CreateRentalController();

const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.get(
    "/user",
    ensureAuthenticated,
    listRentalByUserController.handle
);

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);

rentalsRoutes.post(
    "/devolution/:id",
    ensureAuthenticated,
    devolutionRentalController.handle
);

export { rentalsRoutes };
