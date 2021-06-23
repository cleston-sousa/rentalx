import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRentalsRepository {
    findById(id: string): Promise<Rental>;

    findOpenedRentalById(id: string): Promise<Rental>;

    findOpenedRentalByCar(car_id: string): Promise<Rental>;

    findOpenedRentalByUser(user_id: string): Promise<Rental>;

    findByUser(user_id: string): Promise<Rental[]>;

    create(data: ICreateRentalDTO): Promise<Rental>;

    save(data: Rental): Promise<Rental>;
}

export { IRentalsRepository };
