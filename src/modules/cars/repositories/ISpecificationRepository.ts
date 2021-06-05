import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface ICreatecSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    create({
        name,
        description,
    }: ICreatecSpecificationDTO): Promise<Specification>;

    finByName(name: string): Promise<Specification>;

    list(): Promise<Specification[]>;

    finByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationRepository, ICreatecSpecificationDTO };
