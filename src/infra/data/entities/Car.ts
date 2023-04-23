import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './abstracts/BaseEntity';
import { Category } from './Category';
import { Specification } from './Specification';

@Entity('car')
export class Car extends BaseEntity {
    @Column('varchar')
    public name: string;

    @Column('varchar')
    public description: string;

    @Column('decimal')
    public daily_rate: number;

    @Column('boolean')
    public available = true;

    @Column('varchar')
    public license_plate: string;

    @Column('decimal')
    public fine_amount: number;

    @Column('varchar')
    public brand: string;

    @Column('uuid')
    public category_id: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    public category!: Category;

    @ManyToMany(() => Specification)
    @JoinTable({
        name: 'specification_car',
        joinColumns: [{ name: 'car_id' }],
        inverseJoinColumns: [{ name: 'specification_id' }]
    })
    public specifications!: Specification[];

    constructor(
        _name: string, 
        _description: string,
        _daily_rate: number,
        _license_plate: string,
        _fine_amount: number,
        _brand: string,
        _category_id: string,
        // _available?: boolean,
        _created_at?: Date,
        _id?: string
    )
    {
        super(_created_at, _id);

        this.name = _name;
        this.description = _description;
        this.daily_rate = _daily_rate;
        this.license_plate = _license_plate;
        this.fine_amount = _fine_amount;
        this.brand = _brand;
        this.category_id = _category_id;


        if (!_id) {
            this.available = true;
        }
    }
}