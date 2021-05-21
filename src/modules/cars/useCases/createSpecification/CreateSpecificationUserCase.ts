import { inject, injectable } from "tsyringe";

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
        if (existis) throw new Error("Specification already existis!");
        await this.specificationRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
