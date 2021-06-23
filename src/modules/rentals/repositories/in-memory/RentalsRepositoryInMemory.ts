import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = [];

    async findOpenedRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(
            (item) => item.car_id === car_id && !item.end_date
        );
    }
    async findOpenedRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(
            (item) => item.user_id === user_id && !item.end_date
        );
    }
    async create({
        user_id,
        car_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            user_id,
            car_id,
            expected_return_date,
            start_date: new Date(),
        });

        this.rentals.push(rental);

        return rental;
    }

    async findById(id: string): Promise<Rental> {
        return this.rentals.find((item) => item.id === id);
    }

    async save(data: Rental): Promise<Rental> {
        const rentalIndex = this.rentals.findIndex(
            (item) => item.id === data.id
        );

        this.rentals.splice(rentalIndex, 1, data);

        return data;
    }

    async findOpenedRentalById(id: string): Promise<Rental> {
        return this.rentals.find((item) => item.id === id && !item.end_date);
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        return this.rentals.filter((item) => item.user_id === user_id);
    }
}

export { RentalsRepositoryInMemory };
