import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("categoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) { }

    async loadCategories(
        file: Express.Multer.File
    ): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const categories: IImportCategory[] = [];
            const stream = fs.createReadStream(file.path);
            const parseFile = csvParse();
            stream.pipe(parseFile);
            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    categories.push({ name, description });
                })
                .on("end", async () => {
                    await fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        const promises = categories.map(async (item, index) => {
            const { name, description } = item;
            const alreadyExists = await this.categoriesRepository.findByName(
                name
            );
            if (alreadyExists) {
                throw new AppError(`Line ${index}: Category already exists!`);
            }
            await this.categoriesRepository.create({ name, description });
        });

        await Promise.all(promises);
    }
}

export { ImportCategoryUseCase };
