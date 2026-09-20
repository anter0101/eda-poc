import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Ensures the shipping-service PostgreSQL schema exists.
 */
export class CreateShippingSchema1740000000000 implements MigrationInterface {
  private schema = 'shipping';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE SCHEMA IF NOT EXISTS shipping');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP SCHEMA IF EXISTS shipping CASCADE');
  }
}