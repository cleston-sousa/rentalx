import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListAvailableCarsDTO } from "@modules/cars/dtos/IListAvailableCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async findAvailable({
        name,
        brand,
        category_id,
    }: IListAvailableCarsDTO): Promise<Car[]> {
        const queryBuilder = this.repository
            .createQueryBuilder("c")
            .where("c.available = :available", { available: true });

        if (category_id)
            queryBuilder.andWhere("c.category_id = :category_id", {
                category_id,
            });
        if (brand) queryBuilder.andWhere("c.brand = :brand", { brand });
        if (name) queryBuilder.andWhere("c.name = :name", { name });

        const result = queryBuilder.getMany();

        return result;
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
        const newCar = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });
        await this.repository.save(newCar);
        return newCar;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });
        return car;
    }
}

export { CarsRepository };
