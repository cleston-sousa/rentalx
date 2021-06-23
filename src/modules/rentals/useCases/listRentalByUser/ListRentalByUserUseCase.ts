import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

@injectable()
class ListRentalByUserUseCase {
    constructor(
        @inject("rentalsRepository")
        private rentalsRepository: IRentalsRepository
    ) { }

    async execute(user_id: string): Promise<Rental[]> {
        const rentals = await this.rentalsRepository.findByUser(user_id);
        return rentals;
    }
}

export { ListRentalByUserUseCase };
