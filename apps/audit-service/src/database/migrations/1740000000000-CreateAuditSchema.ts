import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Ensures the audit-service PostgreSQL schema exists.
 */
export class CreateAuditSchema1740000000000 implements MigrationInterface {
  private schema = 'audit';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE SCHEMA IF NOT EXISTS audit');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP SCHEMA IF EXISTS audit CASCADE');
  }
}