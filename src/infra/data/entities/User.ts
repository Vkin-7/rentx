import { Column, Entity } from 'typeorm';
import { BaseEntity } from './abstracts/BaseEntity';

@Entity()
export class User extends BaseEntity {
    @Column('text')
    public name: string;

    @Column('text')
    public email: string;

    @Column('text')
    public password: string;

    @Column('text')
    public driver_license: string;

    @Column('boolean')
    public isAdmin: boolean;

    @Column('text')
    public avatar?: string;


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