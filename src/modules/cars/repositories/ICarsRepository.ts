import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListAvailableCarsDTO } from "@modules/cars/dtos/IListAvailableCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

interface ICarsRepository {
    findById(id: string): Promise<Car>;

    save(data: ICreateCarDTO): Promise<Car>;

    findByLicensePlate(license_plate: string): Promise<Car>;

    findAvailable(data: IListAvailableCarsDTO): Promise<Car[]>;

    updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
