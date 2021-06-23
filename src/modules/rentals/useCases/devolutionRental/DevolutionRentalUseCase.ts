import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
}
@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("rentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("dateProvider") private dateProvider: IDateProvider,
        @inject("carsRepository") private carsRepository: ICarsRepository
    ) { }

    async execute({ id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findOpenedRentalById(id);

        if (!rental) {
            throw new AppError("Rental no registered");
        }

        const car = await this.carsRepository.findById(rental.car_id);

        const dateNow = this.dateProvider.dateNow();

        let daysToFine = this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_date
        );

        if (daysToFine < 0) daysToFine = 0;

        let daysToPay = this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_date
        );

        if (daysToPay <= 0) daysToPay = 1;

        const total = daysToFine * car.fine_amount + daysToPay * car.daily_rate;

        rental.end_date = dateNow;
        rental.total = total;

        await this.rentalsRepository.save(rental);
        await this.carsRepository.updateAvailable(rental.car_id, false);

        return rental;
    }
}
export { DevolutionRentalUseCase };
