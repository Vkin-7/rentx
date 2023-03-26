import { Column, Entity } from 'typeorm';
import { BaseEntity } from './abstracts/BaseEntity';

@Entity()
export class Category extends BaseEntity {
    @Column('text')
    public name: string;

    @Column('text')
    public description: string;

    constructor(
        _name: string, 
        _description: string,
        _created_at?: Date,
        _id?: string
    )
    {
        super(_created_at, _id);

        this.name = _name;
        this.description = _description;
    }
} 