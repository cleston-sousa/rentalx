import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersToken1624471707886 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_tokens",
                columns: [
                    { name: "id", type: "uuid", isPrimary: true },
                    { name: "refresh_token", type: "varchar" },
                    { name: "user_id", type: "uuid" },
                    { name: "expires_date", type: "timestamp" },
                    { name: "created_at", type: "timestamp", default: "now()" },
                ],
                foreignKeys: [
                    {
                        name: "fk_users_tokens_0",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_tokens");
    }
}
