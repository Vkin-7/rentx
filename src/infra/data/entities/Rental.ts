import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './abstracts/BaseEntity';
import { Car } from './Car';

@Entity('rental')
export class Rental extends BaseEntity {

    @ManyToOne(() => Car)
    @JoinColumn({ name: 'car_id' })
    public car!: Car;

    @Column('uuid')
    public car_id: string;

    @Column('uuid')
    public user_id: string;

    @Column('timestamp')
    public expected_return_date: Date;

    @Column('timestamp')
    public start_date: Date;
    
    @Column('timestamp')
    public end_date?: Date;
    
    @Column('numeric')
    public total: number;
    
    @Column('timestamp')
    public updated_at?: Date;

    constructor(
        _car_id: string,
        _user_id: string,
        _expected_return_date: Date,
        _start_date: Date,
        _total: number,
        _end_date?: Date,
        _updated_at?: Date,
        _created_at?: Date,
        _id?: string
    ){
        super(_created_at, _id);

        this.car_id = _car_id;
        this.user_id = _user_id;
        this.expected_return_date = _expected_return_date;
        this.start_date = _start_date;
        this.total = _total;
        this.end_date = _end_date;
        this.updated_at = _updated_at;
    }
}