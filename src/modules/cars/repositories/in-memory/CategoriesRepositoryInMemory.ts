import { Category } from "@modules/cars/entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find((item) => item.name === name);
        return category;
    }

    async list(): Promise<Category[]> {
        return this.categories;
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const detached = new Category();

        Object.assign(detached, { name, description });

        this.categories.push(detached);
    }
}

export { CategoriesRepositoryInMemory };