import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "@modules/cars/useCases/createCategory/CreateCategoryUseCase";
import { AppError } from "@shared/errors/AppError";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let categoryTest;
describe("create category", () => {
    beforeEach(() => {
        categoryTest = { name: "name  test", description: "desc test" };

        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();

        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });

    it("given name, description with valid values when execute then save new entity", async () => {
        await createCategoryUseCase.execute(categoryTest);

        const persisted = await categoriesRepositoryInMemory.findByName(
            categoryTest.name
        );

        expect(persisted).toHaveProperty("id");
    });

    it("given name, description with name already registered when execute then throws AppError", async () => {
        await createCategoryUseCase.execute(categoryTest);

        await expect(
            createCategoryUseCase.execute(categoryTest)
        ).rejects.toEqual(new AppError("Category already exists!"));
    });
});
