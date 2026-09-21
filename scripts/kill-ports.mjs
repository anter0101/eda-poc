#!/usr/bin/env node
/**
 * Kill processes listening on the given ports (defaults: Nest service ports 3001–3008).
 *
 *   pnpm ports:kill
 *   pnpm ports:kill -- 3001 3004
 *   node scripts/kill-ports.mjs 3001 5432
 */

import { execSync } from 'node:child_process';

const DEFAULT_PORTS = [3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008];

const args = process.argv.slice(2).filter((a) => a !== '--');
const ports = (args.length ? args : DEFAULT_PORTS.map(String))
  .map((p) => Number(p))
  .filter((p) => Number.isInteger(p) && p > 0 && p < 65536);

if (!ports.length) {
  console.error('Usage: pnpm ports:kill [-- <port> ...]');
  process.exit(1);
}

const isWin = process.platform === 'win32';

function pidsOnPortWindows(port) {
  try {
    const out = execSync(`netstat -ano -p tcp`, { encoding: 'utf8' });
    const pids = new Set();
    for (const line of out.split(/\r?\n/)) {
      // e.g. TCP    0.0.0.0:3001    0.0.0.0:0    LISTENING    12345
      if (!line.includes('LISTENING')) continue;
      const parts = line.trim().split(/\s+/);
      const local = parts[1] ?? '';
      const pid = parts[parts.length - 1];
      if (
        (local.endsWith(`:${port}`) || local.endsWith(`]:${port}`)) &&
        /^\d+$/.test(pid)
      ) {
        pids.add(pid);
      }
    }
    return [...pids];
  } catch {
    return [];
  }
}

function pidsOnPortUnix(port) {
  try {
    const out = execSync(`lsof -tiTCP:${port} -sTCP:LISTEN`, {
      encoding: 'utf8',
    });
    return out
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function killPid(pid) {
  try {
    if (isWin) {
      execSync(`taskkill /PID ${pid} /T /F`, { stdio: 'ignore' });
    } else {
      process.kill(Number(pid), 'SIGKILL');
    }
    return true;
  } catch {
    return false;
  }
}

let killed = 0;
for (const port of ports) {
  const pids = isWin ? pidsOnPortWindows(port) : pidsOnPortUnix(port);
  if (!pids.length) {
    console.log(`port ${port}: free`);
    continue;
  }
  for (const pid of pids) {
    if (String(pid) === String(process.pid)) continue;
    const ok = killPid(pid);
    console.log(
      ok
        ? `port ${port}: killed pid ${pid}`
        : `port ${port}: failed to kill pid ${pid}`,
    );
    if (ok) killed += 1;
  }
}

console.log(killed ? `Done (${killed} process(es) killed).` : 'Done (nothing to kill).');
