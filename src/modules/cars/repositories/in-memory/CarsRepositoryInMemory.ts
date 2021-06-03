import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListAvailableCarsDTO } from "@modules/cars/dtos/IListAvailableCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async findAvailable({
        name,
        brand,
        category_id,
    }: IListAvailableCarsDTO): Promise<Car[]> {
        let list = this.cars.filter((item) => item.available === true);

        if (category_id)
            list = list.filter((item) => item.category_id === category_id);

        if (brand) list = list.filter((item) => item.brand === brand);

        if (name) list = list.filter((item) => item.name === name);

        return list;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((item) => item.license_plate === license_plate);
    }

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const newCar = new Car();

        Object.assign(newCar, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            created_at: new Date(),
        });

        this.cars.push(newCar);

        return newCar;
    }
}

export { CarsRepositoryInMemory };
