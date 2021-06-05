import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: ICarsRepository;

describe("list cars", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
    });

    it("given_with_whenExecute_thenReturnListOfAvailableCar", async () => {
        const car1 = await carsRepository.save({
            name: "Tucs Power",
            description: "Super legal",
            daily_rate: 250,
            license_plate: "ABC-9988",
            fine_amount: 150,
            brand: "Hyundai",
            category_id: "12345",
        });

        await carsRepository.save({
            name: "Tucs Power 2",
            description: "Super legal",
            daily_rate: 250,
            license_plate: "CDE-9988",
            fine_amount: 150,
            brand: "Hyndai",
            category_id: "67890",
        });

        const list = await listAvailableCarsUseCase.execute({});

        expect(list.length).toBe(2);
        expect(list).toContain(car1);
    });

    it("givenCarBrand_with_whenExecute_thenReturnFilteredListOfAvailableCar", async () => {
        await carsRepository.save({
            name: "Tucs Power",
            description: "Super legal",
            daily_rate: 250,
            license_plate: "ABC-9988",
            fine_amount: 150,
            brand: "Hyundai",
            category_id: "12345",
        });

        const car2 = await carsRepository.save({
            name: "Tucs Power 2",
            description: "Super legal",
            daily_rate: 250,
            license_plate: "CDE-9988",
            fine_amount: 150,
            brand: "Hyndai",
            category_id: "67890",
        });

        const list = await listAvailableCarsUseCase.execute({
            brand: "Hyndai",
        });

        expect(list.length).toBe(1);
        expect(list).toContain(car2);
    });

    it("givenCarName_with_whenExecute_thenReturnFilteredListOfAvailableCar", async () => {
        const car1 = await carsRepository.save({
            name: "Tucs Power",
            description: "Super legal",
            daily_rate: 250,
            license_plate: "ABC-9988",
            fine_amount: 150,
            brand: "Hyundai",
            category_id: "12345",
        });

        await carsRepository.save({
            name: "Tucs Power 2",
            description: "Super legal",
            daily_rate: 250,
            license_plate: "CDE-9988",
            fine_amount: 150,
            brand: "Hyndai",
            category_id: "67890",
        });

        const list = await listAvailableCarsUseCase.execute({
            name: "Tucs Power",
        });

        expect(list.length).toBe(1);
        expect(list).toContain(car1);
    });

    it("givenCategory_with_whenExecute_thenReturnFilteredListOfAvailableCar", async () => {
        await carsRepository.save({
            name: "Tucs Power",
            description: "Super legal",
            daily_rate: 250,
            license_plate: "ABC-9988",
            fine_amount: 150,
            brand: "Hyundai",
            category_id: "12345",
        });

        const car2 = await carsRepository.save({
            name: "Tucs Power 2",
            description: "Super legal",
            daily_rate: 250,
            license_plate: "CDE-9988",
            fine_amount: 150,
            brand: "Hyndai",
            category_id: "67890",
        });

        const list = await listAvailableCarsUseCase.execute({
            category_id: "67890",
        });

        expect(list.length).toBe(1);
        expect(list).toContain(car2);
    });
});
