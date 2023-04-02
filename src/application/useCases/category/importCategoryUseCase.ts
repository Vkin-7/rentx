// import { IImportCategoryDTO } from '@DTO/category/IImportCategoryDTO';
import fs from 'node:fs';
import { parse } from 'csv-parse';
import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@Repositories/interfaces/ICategoriesRepository';
import { ICreateCategoryDTO } from '@DTO/category/ICreateCategoryDTO';


@injectable()
export class ImportCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoryRepository: ICategoriesRepository
    ) {}

    private async loadCategories(file: Express.Multer.File): Promise<ICreateCategoryDTO[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: ICreateCategoryDTO[] = [];
    
            const parseFile = parse({
                delimiter: ','
            });
    
            stream.pipe(parseFile);
                
            parseFile.on('data', async line => {
                const [name, description] = line;
                categories.push({
                    name, description
                });
            }).on('end', () => {
                fs.promises.unlink(file.path);
                resolve(categories);
            }).on('error', (err) => {
                reject(err);
            });
        });

    }

    async execute(file: Express.Multer.File): Promise<boolean> {
        const categories = await this.loadCategories(file);

        categories.map(async category => {
            const categoryAlreadyExist = await this.categoryRepository.findByName(category.name);

            if (!categoryAlreadyExist) {
                await this.categoryRepository.create({ ...category });
            } else {
                console.error(`Category with name: ${category.name}, already exists!`);
            }
        });

        return true;
    }
}