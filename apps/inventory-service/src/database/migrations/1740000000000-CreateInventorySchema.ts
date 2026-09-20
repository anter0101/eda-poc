import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Ensures the inventory-service PostgreSQL schema exists.
 */
export class CreateInventorySchema1740000000000 implements MigrationInterface {
  private schema = 'inventory';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE SCHEMA IF NOT EXISTS inventory');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP SCHEMA IF EXISTS inventory CASCADE');
  }
}