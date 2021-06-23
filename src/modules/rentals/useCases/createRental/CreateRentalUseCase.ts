import { inject, injectable } from "tsyringe";

import appConfig from "@config/appConfig";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("rentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("dateProvider") private dateProvider: IDateProvider,
        @inject("carsRepository") private carsRepository: ICarsRepository
    ) { }

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minimumDays = appConfig.minimum_rent_days;

        const carUnavailable =
            await this.rentalsRepository.findOpenedRentalByCar(car_id);

        if (carUnavailable) {
            throw new AppError("car unavailable");
        }

        const userAlreadyOpened =
            await this.rentalsRepository.findOpenedRentalByUser(user_id);

        if (userAlreadyOpened) {
            throw new AppError("user already have a rental opened");
        }

        const dateNow = this.dateProvider.dateNow();

        const dateCompare = this.dateProvider.compareInDays(
            expected_return_date,
            dateNow
        );

        if (dateCompare < minimumDays) {
            throw new AppError("minimum rent time invalid");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.carsRepository.updateAvailable(car_id, false);

        return rental;
    }
}

export { CreateRentalUseCase };
