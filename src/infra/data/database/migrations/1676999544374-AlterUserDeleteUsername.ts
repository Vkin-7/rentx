import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserDeleteUsername1676999544374 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user', 'username');

        await queryRunner.changeColumn('user', 'email', new TableColumn({
            name: 'email',
            type: 'varchar',
            isUnique: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'user',
            new TableColumn({
                name: 'username',
                type: 'varchar',
                isUnique: true
            })
        );

        await queryRunner.changeColumn('user', 'email', new TableColumn({
            name: 'email',
            type: 'varchar'
        }));
    }

}
