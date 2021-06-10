import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { CreateRentalUseCase } from "@modules/rentals/useCases/createRental/CreateRentalUseCase";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: IRentalsRepository;
let dateProvider: IDateProvider;

describe("create rental", () => {
    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepository,
            dateProvider
        );
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
