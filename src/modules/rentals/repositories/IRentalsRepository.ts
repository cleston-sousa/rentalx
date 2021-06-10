import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRentalsRepository {
    findOpenedRentalByCar(car_id: string): Promise<Rental>;

    findOpenedRentalByUser(user_id: string): Promise<Rental>;

    create(data: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };
