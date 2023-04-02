import { Specification } from '@Entities/Specification';

export interface ICreateCarDTO {
    name: string,
    description: string,
    daily_rate: number;
    license_plate: string;
    final_amount: number;
    brand: string;
    category_id: string;
    specifications?: Specification[];
    id?: string;
}