import { Specification } from '../../model/Specification';
import { ICreatecSpecificationDTO, ISpecificationRepository } from '../ISpecificationRepository';



class SpecificationRepository implements ISpecificationRepository {

    private specifications: Specification[];

    private constructor() {
        this.specifications = [];
    }
    list(): Specification[] {
        return this.specifications;
    }

    private static instance: SpecificationRepository;
    public static getInstance(): SpecificationRepository {
        if (!SpecificationRepository.instance)
            SpecificationRepository.instance = new SpecificationRepository();
        return SpecificationRepository.instance;
    }

    create({ name, description }: ICreatecSpecificationDTO): void {

        const specification = new Specification();

        Object.assign(specification, { name, description, create_at: new Date() });

        this.specifications.push(specification);

    }

    finByName(name: string): Specification {
        return this.specifications.find(item => item.name === name);
    }
}


export { SpecificationRepository };
