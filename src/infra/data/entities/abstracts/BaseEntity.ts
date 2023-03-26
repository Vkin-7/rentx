import { randomUUID } from 'node:crypto';
import { CreateDateColumn, PrimaryColumn } from 'typeorm';

export abstract class BaseEntity {  
    @PrimaryColumn('uuid')
    public id: string;

    @CreateDateColumn()
    public created_at?: Date;

    constructor(
        _created_at?: Date,
        _id?: string,
    ) {
        if (!_id) {
            this.id = randomUUID();
        } else {
            this.id = _id;
        }

        this.created_at = _created_at;
    }
}