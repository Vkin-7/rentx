import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateSpecificationsCars1680445009932 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'specification_car',
            columns: [
                {
                    name: 'car_id',
                    type: 'uuid',
                },
                {
                    name: 'specification_id',
                    type: 'uuid',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                }
            ]
        });

        await queryRunner.createTable(table);

        await queryRunner.createForeignKeys(
            table.name,
            [
                new TableForeignKey({
                    name: 'FKSpecificationCar',
                    referencedTableName: 'specification',
                    referencedColumnNames: ['id'],
                    columnNames: ['specification_id'],
                    onDelete: 'SET NULL',
                    onUpdate: 'SET NULL'
                }),
                new TableForeignKey({
                    name: 'FKCarSpecification',
                    referencedTableName: 'car',
                    referencedColumnNames: ['id'],
                    columnNames: ['car_id'],
                    onDelete: 'SET NULL',
                    onUpdate: 'SET NULL'
                })
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('specification_car');

        if (table) {
            const foreignKeys = table?.foreignKeys || [];

            await queryRunner.dropForeignKeys(table.name, foreignKeys);

            await queryRunner.dropTable(table.name);
        }
    }

}
