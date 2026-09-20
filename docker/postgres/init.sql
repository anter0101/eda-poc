-- Per-service PostgreSQL schemas (database-per-service via schemas).
-- Domain tables are added in later labs.

CREATE SCHEMA IF NOT EXISTS "order";
CREATE SCHEMA IF NOT EXISTS payment;
CREATE SCHEMA IF NOT EXISTS inventory;
CREATE SCHEMA IF NOT EXISTS notification;
CREATE SCHEMA IF NOT EXISTS analytics;
CREATE SCHEMA IF NOT EXISTS audit;
CREATE SCHEMA IF NOT EXISTS shipping;
CREATE SCHEMA IF NOT EXISTS workflow;
