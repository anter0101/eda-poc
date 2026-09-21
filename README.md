# Event-Driven Architecture POC

pnpm + Turbo monorepo with eight NestJS domain services, shared event/messaging libs, PostgreSQL, and RabbitMQ.

**Focus:** event-driven flows (later labs). No auth, no API gateway.

## Lab 0 — Infrastructure Setup

### Prerequisites

- Node.js >= 20.19
- pnpm 9.15 (`corepack enable` then `corepack prepare pnpm@9.15.0 --activate`)
- Docker Desktop (or Docker Engine + Compose)

### Layout

```
eda-poc/
├── apps/
│   ├── order-service/          # :3001  schema order
│   ├── payment-service/        # :3002  schema payment
│   ├── inventory-service/      # :3003  schema inventory
│   ├── notification-service/   # :3004  schema notification
│   ├── analytics-service/      # :3005  schema analytics
│   ├── audit-service/          # :3006  schema audit
│   ├── shipping-service/       # :3007  schema shipping
│   └── workflow-service/       # :3008  schema workflow
├── libs/
│   ├── events/                 # shared event names/types
│   └── messaging/              # RabbitMQ Nest stub
├── docker/postgres/init.sql
├── docker-compose.yml
└── README.md
```

### Checklist

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Start PostgreSQL + RabbitMQ**

   ```bash
   pnpm infra:up
   ```

3. **Open RabbitMQ Management UI**

   - URL: http://localhost:15672
   - User / password: `guest` / `guest`

4. **Confirm Postgres schemas**

   ```bash
   docker compose exec postgres psql -U postgres -d eda_lab -c "\dn"
   ```

   You should see: `order`, `payment`, `inventory`, `notification`, `analytics`, `audit`, `shipping`, `workflow`.

5. **Build the monorepo**

   ```bash
   pnpm build
   ```

6. **(Optional) Start one service and hit health**

   ```bash
   pnpm --filter @eda/order-service start:dev
   ```

   Then: http://localhost:3001/health → `{ "status": "ok", "service": "order-service" }`

### Useful scripts

| Script | Description |
|--------|-------------|
| `pnpm infra:up` | Start Postgres + RabbitMQ |
| `pnpm infra:down` | Stop infrastructure |
| `pnpm infra:logs` | Tail compose logs |
| `pnpm build` | Build libs + all apps (Turbo) |
| `pnpm dev` | Watch all packages |
| `pnpm --filter @eda/<service> start:dev` | Run a single service |
| `pnpm ports:kill` | Kill processes on ports 3001–3008 |
| `pnpm ports:kill -- 3001 3004` | Kill processes on specific ports |

### Environment

- Root [`.env.development`](.env.development) — shared DB + RabbitMQ settings
- Each app `.env.development` — `PORT`, `DATABASE_SCHEMA`, `SERVICE_NAME`

Copy [`.env.example`](.env.example) if you need a fresh root env file.
