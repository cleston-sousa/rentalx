import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("carsRepository") private carsRepository: ICarsRepository,
        @inject("specificationRepository")
        private specificationRepository: ISpecificationRepository
    ) { }

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const car = await this.carsRepository.findById(car_id);

        if (!car) throw new AppError("car doesn't exists");

        const specifications = await this.specificationRepository.finByIds(
            specifications_id
        );

        car.specifications = specifications;

        const result = await this.carsRepository.save(car);

        return result;
    }
}

export { CreateCarSpecificationUseCase };
