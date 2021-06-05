import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { CreateCarSpecificationUseCase } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase";
import { AppError } from "@shared/errors/AppError";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepositoryInMemory;
let specificationRepository: ISpecificationRepository;

describe("create car specification", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        specificationRepository = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepository,
            specificationRepository
        );
    });

    it("givenCarAndSpecification_with_whenExecute_thenAssignCarAndSpecification", async () => {
        const newCar = await carsRepository.save({
            name: "car name",
            description: "car description",
            daily_rate: 100,
            license_plate: "ABC12D34",
            fine_amount: 60,
            brand: "car brand",
            category_id: "nono",
        });
        const newSpecification = await specificationRepository.create({
            name: "automatico",
            description: "cambio automatico",
        });
        const newSpecification2 = await specificationRepository.create({
            name: "multimidia",
            description: "kit multimidia instalado",
        });

        const car_id = newCar.id;
        const specifications_id = [newSpecification.id, newSpecification2.id];

        const carResult = await createCarSpecificationUseCase.execute({
            car_id,
            specifications_id,
        });

        expect(carResult.id).toBe(newCar.id);
        expect(carResult).toHaveProperty("specifications");
        expect(carResult.specifications.length).toBe(2);
    });

    it("givenCarAndSpecification_withInexistentCar_whenExecute_thenThrowsAppError", async () => {
        const car_id = "1234";
        const specifications_id = ["1111", "2222", "3333"];

        expect(async () => {
            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
