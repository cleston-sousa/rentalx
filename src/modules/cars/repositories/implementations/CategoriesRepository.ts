import { Category } from '../../model/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {

    private categories: Category[];

    private constructor() {
        this.categories = [];
    }

    private static instance: CategoriesRepository;
    public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.instance)
            CategoriesRepository.instance = new CategoriesRepository();
        return CategoriesRepository.instance;
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category {
        const category = this.categories.find(item => item.name === name);
        return category;
    }

    create({ name, description }: ICreateCategoryDTO): void {
        const category = new Category();
        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        });
        this.categories.push(category);
    }

}

export { CategoriesRepository };
