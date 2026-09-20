import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Ensures the payment-service PostgreSQL schema exists.
 */
export class CreatePaymentSchema1740000000000 implements MigrationInterface {
  private schema = 'payment';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE SCHEMA IF NOT EXISTS payment');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP SCHEMA IF EXISTS payment CASCADE');
  }
}