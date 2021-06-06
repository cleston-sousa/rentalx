import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

interface IRequest {
    car_id: string;
    image_names: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("carsImagesRepository")
        private carsImagesRepository: ICarsImagesRepository
    ) { }

    async execute({ car_id, image_names }: IRequest): Promise<void> {
        image_names.map(async (image_name) => {
            await this.carsImagesRepository.create(car_id, image_name);
        });
    }
}

export { UploadCarImagesUseCase };
