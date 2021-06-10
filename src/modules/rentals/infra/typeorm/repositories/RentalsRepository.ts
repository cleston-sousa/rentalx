import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findOpenedRentalByCar(car_id: string): Promise<Rental> {
        const openedByCar = await this.repository.findOne({ car_id });
        return openedByCar;
    }

    async findOpenedRentalByUser(user_id: string): Promise<Rental> {
        const openedByUser = await this.repository.findOne({ user_id });
        return openedByUser;
    }

    async create({
        user_id,
        expected_return_date,
        car_id,
    }: ICreateRentalDTO): Promise<Rental> {
        const newRental = this.repository.create({
            user_id,
            expected_return_date,
            car_id,
        });

        await this.repository.save(newRental);

        return newRental;
    }
}

export { RentalsRepository };
