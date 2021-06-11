import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("categoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const alreadyExists = await this.categoriesRepository.findByName(name);
        if (alreadyExists) throw new AppError("Category already exists!");

        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
