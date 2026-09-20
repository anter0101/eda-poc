import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Ensures the order-service PostgreSQL schema exists.
 */
export class CreateOrderSchema1740000000000 implements MigrationInterface {
  private schema = 'order';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE SCHEMA IF NOT EXISTS "order"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP SCHEMA IF EXISTS "order" CASCADE');
  }
}