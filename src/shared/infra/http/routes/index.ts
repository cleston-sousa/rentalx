import { Router } from "express";

import { authenticateRoutes } from "@shared/infra/http/routes/authenticate.routes";
import { carsRoutes } from "@shared/infra/http/routes/cars.routes";
import { categoriesRoutes } from "@shared/infra/http/routes/categories.routes";
import { passwordRoutes } from "@shared/infra/http/routes/password.routes";
import { rentalsRoutes } from "@shared/infra/http/routes/rentals.routes";
import { specificationsRoutes } from "@shared/infra/http/routes/specifications.routes";
import { usersRoutes } from "@shared/infra/http/routes/users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);

router.use("/specifications", specificationsRoutes);

router.use("/users", usersRoutes);

router.use("/cars", carsRoutes);

router.use("/rentals", rentalsRoutes);

router.use("/password", passwordRoutes);

router.use(authenticateRoutes);

export { router };
