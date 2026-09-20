import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Ensures the workflow-service PostgreSQL schema exists.
 */
export class CreateWorkflowSchema1740000000000 implements MigrationInterface {
  private schema = 'workflow';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE SCHEMA IF NOT EXISTS workflow');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP SCHEMA IF EXISTS workflow CASCADE');
  }
}