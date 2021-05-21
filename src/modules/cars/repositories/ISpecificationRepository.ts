import { Specification } from "../entities/Specification";

interface ICreatecSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    create({ name, description }: ICreatecSpecificationDTO): Promise<void>;
    finByName(name: string): Promise<Specification>;
    list(): Promise<Specification[]>;
}

export { ISpecificationRepository, ICreatecSpecificationDTO };
