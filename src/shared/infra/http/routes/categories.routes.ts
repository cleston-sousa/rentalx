import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get("/", listCategoriesController.handle);

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle
);

const importCategoryController = new ImportCategoryController();
categoriesRoutes.post(
    "/import",
    ensureAuthenticated,
    ensureAdmin,
    upload.single("file"),
    importCategoryController.handle
);

export { categoriesRoutes };
