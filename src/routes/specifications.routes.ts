import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecifications/ListSpecificationsController";

const specificationsRoutes = Router();

const listSpecificationsController = new ListSpecificationsController();
specificationsRoutes.get("/", listSpecificationsController.handle);

const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
