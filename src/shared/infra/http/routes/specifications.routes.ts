import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const listSpecificationsController = new ListSpecificationsController();
specificationsRoutes.get("/", listSpecificationsController.handle);

const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handle
);

export { specificationsRoutes };
