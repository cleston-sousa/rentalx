import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "@modules/cars/useCases/uploadCarImage/UploadCarImagesUseCase";

interface IFiles {
    filename: string;
}

class UploadCarImagesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const images = request.files as IFiles[];

        const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

        const image_names = images.map((image_file) => {
            return image_file.filename;
        });

        await uploadCarImageUseCase.execute({
            car_id: id,
            image_names,
        });

        return response.status(201).send();
    }
}

export { UploadCarImagesController };
