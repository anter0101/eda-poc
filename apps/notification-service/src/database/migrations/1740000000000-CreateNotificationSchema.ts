import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Ensures the notification-service PostgreSQL schema exists.
 */
export class CreateNotificationSchema1740000000000 implements MigrationInterface {
  private schema = 'notification';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE SCHEMA IF NOT EXISTS notification');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP SCHEMA IF EXISTS notification CASCADE');
  }
}