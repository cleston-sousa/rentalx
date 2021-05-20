import { Specification } from '../model/Specification';

interface ICreatecSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    create({ name, description }: ICreatecSpecificationDTO): void;
    finByName(name: string): Specification;
    list(): Specification[];
}

export { ISpecificationRepository, ICreatecSpecificationDTO };
