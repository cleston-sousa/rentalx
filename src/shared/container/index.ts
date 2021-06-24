import { container } from "tsyringe";

import "@shared/container/providers";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository.";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

container.registerSingleton<IUsersRepository>(
    "usersRepository",
    UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
    "usersTokensRepository",
    UsersTokensRepository
);

container.registerSingleton<ICategoriesRepository>(
    "categoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
    "specificationRepository",
    SpecificationRepository
);

container.registerSingleton<ICarsRepository>("carsRepository", CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
    "carsImagesRepository",
    CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
    "rentalsRepository",
    RentalsRepository
);
