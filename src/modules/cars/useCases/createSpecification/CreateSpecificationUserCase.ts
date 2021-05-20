import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {

    constructor(private specificationRepository: ISpecificationRepository) { }

    execute({ name, description }: IRequest): void {
        const existis = this.specificationRepository.finByName(name);
        if (existis)
            throw new Error('Specification already existis!');

        this.specificationRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
