import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "@modules/cars/useCases/createCar/CreateCarUseCase";
import { AppError } from "@shared/errors/AppError";

let createCarUseCase: CreateCarUseCase;
let carsRepository: ICarsRepository;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    });

    it("givenCarData_withValidInfo_whenExecute_thenAddCar", async () => {
        const newCar = await createCarUseCase.execute({
            name: "car name",
            description: "car description",
            daily_rate: 100,
            license_plate: "ABC12D34",
            fine_amount: 60,
            brand: "car brand",
            category_id: "nono",
        });

        expect(newCar).toHaveProperty("id");
    });

    it("givenCarData_withLicensePlateDuplicated_whenExecute_thenThrowsAppError", async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "car name",
                description: "car description",
                daily_rate: 100,
                license_plate: "ABC12D34",
                fine_amount: 60,
                brand: "car brand",
                category_id: "nono",
            });

            await createCarUseCase.execute({
                name: "xxxxxxxxxxxx",
                description: "xxxxxxx",
                daily_rate: 90,
                license_plate: "ABC12D34",
                fine_amount: 50,
                brand: "xxxxxxx",
                category_id: "xxxxxxx",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("givenCarData_withValidInfo_whenExecute_thenAddCar", async () => {
        const newCar = await createCarUseCase.execute({
            name: "car name",
            description: "car description",
            daily_rate: 100,
            license_plate: "ABC12D34",
            fine_amount: 60,
            brand: "car brand",
            category_id: "nono",
        });

        expect(newCar.available).toBe(true);
    });
});
