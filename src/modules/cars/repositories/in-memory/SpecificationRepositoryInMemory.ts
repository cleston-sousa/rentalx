import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
    ICreatecSpecificationDTO,
    ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationRepository";

class SpecificationRepositoryInMemory implements ISpecificationRepository {
    specifications: Specification[] = [];

    async create({
        name,
        description,
    }: ICreatecSpecificationDTO): Promise<Specification> {
        const newSpec = new Specification();

        Object.assign(newSpec, {
            name,
            description,
        });

        this.specifications.push(newSpec);
        return newSpec;
    }
    async finByName(name: string): Promise<Specification> {
        return this.specifications.find((item) => item.name === name);
    }
    async list(): Promise<Specification[]> {
        return this.specifications;
    }
    async finByIds(ids: string[]): Promise<Specification[]> {
        const result = this.specifications.filter((item) =>
            ids.includes(item.id)
        );

        return result;
    }
}

export { SpecificationRepositoryInMemory };
