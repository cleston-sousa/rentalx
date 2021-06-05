import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreateSpecificationsCars1622814594092
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "specifications_cars",
                columns: [
                    { name: "cars_id", type: "uuid" },
                    { name: "specifications_id", type: "uuid" },
                    { name: "created_at", type: "timestamp", default: "now()" },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name: "fk_specifications_cars_0",
                referencedTableName: "specifications",
                referencedColumnNames: ["id"],
                columnNames: ["specifications_id"],
                onUpdate: "SET NULL",
                onDelete: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name: "fk_specifications_cars_1",
                referencedTableName: "cars",
                referencedColumnNames: ["id"],
                columnNames: ["cars_id"],
                onUpdate: "SET NULL",
                onDelete: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            "specifications_cars",
            "fk_specifications_cars_0"
        );
        await queryRunner.dropForeignKey(
            "specifications_cars",
            "fk_specifications_cars_1"
        );
        await queryRunner.dropTable("specifications_cars");
    }
}
