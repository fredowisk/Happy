import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1608159844987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "images",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "path",
            type: "varchar",
          },
          {
            name: "orphanage_id",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            //nome da chave
            name: "ImageOrphanage",
            //nome da coluna que a chave será atribuida
            columnNames: ["orphanage_id"],
            //referenciando a tabela orphanages
            referencedTableName: "orphanages",
            //referenciando a coluna ID
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('images');
  }
}
