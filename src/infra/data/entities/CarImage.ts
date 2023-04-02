import { Column, Entity } from 'typeorm';

import { BaseEntity } from './abstracts/BaseEntity';

@Entity('car_image')
export class CarImage extends BaseEntity {
    constructor(
        _car_id: string,
        _image_name: string,
        _created_at?: Date,
        _id?: string
    ) {
        super(_created_at, _id);

        this.car_id = _car_id;
        this.image_name = _image_name;
    }

    @Column('uuid')
    public car_id: string;

    @Column('varchar')
    public image_name: string;
}