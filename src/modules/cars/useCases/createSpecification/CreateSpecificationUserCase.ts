import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("specificationRepository")
        private specificationRepository: ISpecificationRepository
    ) { }
    async execute({ name, description }: IRequest): Promise<void> {
        const existis = await this.specificationRepository.finByName(name);
        if (existis) throw new AppError("Specification already existis!");
        await this.specificationRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
