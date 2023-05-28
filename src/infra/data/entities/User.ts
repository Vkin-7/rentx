import { Column, Entity } from 'typeorm';
import { BaseEntity } from './abstracts/BaseEntity';

import { Expose } from 'class-transformer';

@Entity('user')
export class User extends BaseEntity {
    @Column('text')
    public name: string;

    @Column('text')
    public email: string;

    @Column('text')
    public password: string;

    @Column('text')
    public driver_license: string;

    @Column('bool')
    public isAdmin: boolean;

    @Column('text')
    public avatar?: string;

    @Expose({ name: 'avatar_url' })
    public avatar_url(): string {
        switch (process.env.DISK) {
        case 'local':
            return `${process.env.BASE_URL}/avatar/${this.avatar}}`;
        case 's3':
            return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}}`;
        default:
            return '';
        }
    }


    constructor(
        _name: string, 
        _email: string,
        _password: string,
        _driver_license: string,
        _avatar?: string,
        _created_at?: Date,
        _id?: string
    )
    {
        super(_created_at, _id);

        this.name = _name;
        this.email = _email;
        this.password = _password;
        this.driver_license = _driver_license;
        this.avatar = _avatar;

        this.isAdmin = false;
    }
}