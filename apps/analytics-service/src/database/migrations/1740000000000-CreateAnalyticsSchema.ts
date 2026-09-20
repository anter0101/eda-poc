import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Ensures the analytics-service PostgreSQL schema exists.
 */
export class CreateAnalyticsSchema1740000000000 implements MigrationInterface {
  private schema = 'analytics';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE SCHEMA IF NOT EXISTS analytics');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP SCHEMA IF EXISTS analytics CASCADE');
  }
}