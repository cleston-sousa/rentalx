import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { CreateRentalUseCase } from "@modules/rentals/useCases/createRental/CreateRentalUseCase";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: IRentalsRepository;
let dateProvider: IDateProvider;
let carsRepository: ICarsRepository;

describe("create rental", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        rentalsRepository = new RentalsRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepository,
            dateProvider,
            carsRepository
        );

        carsRepository.save({
            name: "test car",
            description: "thats an awesome car",
            daily_rate: 30,
            license_plate: "xyz-1234",
            fine_amount: 5,
            brand: "lesta",
            category_id: "nonono-nonono-nonono-nonono",
            id: "5678",
        });
    });

    it("givenCarIdUserIdExpectedDate_with_whenCreate_thenReturnRental", async () => {
        const user_id = "1234";
        const car_id = "5678";

        const rental = await createRentalUseCase.execute({
            user_id,
            car_id,
            expected_return_date: dateProvider.addDays(new Date(), 1),
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");

        const rentedCar = await carsRepository.findById("5678");
        expect(rentedCar).toHaveProperty("available", false);
    });

    it("givenCarIdUserIdExpectedDate_withUserIdAlreadyOpened_whenCreate_thenThrowAppError", async () => {
        await createRentalUseCase.execute({
            user_id: "1234",
            car_id: "5678",
            expected_return_date: dateProvider.addDays(new Date(), 1),
        });

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: "9999",
                expected_return_date: dateProvider.addDays(new Date(), 1),
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("givenCarIdUserIdExpectedDate_withCarIdAlreadyOpened_whenCreate_thenThrowAppError", async () => {
        await createRentalUseCase.execute({
            user_id: "1234",
            car_id: "5678",
            expected_return_date: dateProvider.addDays(new Date(), 1),
        });

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "9999",
                car_id: "5678",
                expected_return_date: dateProvider.addDays(new Date(), 1),
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("givenCarIdUserIdExpectedDate_withLessMinimunTime_whenCreate_thenThrowAppError", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "9999",
                car_id: "5678",
                expected_return_date: dateProvider.addHours(new Date(), 20),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
