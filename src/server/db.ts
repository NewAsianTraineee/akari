import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { hashPassword } from "./password";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "aureum_bilverkstad.db");

declare global {
  var __aureumBilDb: DatabaseSync | undefined;
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS bookings (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  guest_name   TEXT    NOT NULL,
  email        TEXT    NOT NULL,
  phone        TEXT,
  date         TEXT    NOT NULL,
  time         TEXT    NOT NULL,
  party_size   INTEGER NOT NULL DEFAULT 1,
  regnr        TEXT,
  mileage      TEXT,
  service_type TEXT    NOT NULL DEFAULT 'service',
  zone         TEXT    NOT NULL DEFAULT 'service',
  notes        TEXT,
  status       TEXT    NOT NULL DEFAULT 'pending',
  source       TEXT    NOT NULL DEFAULT 'web',
  created_at   TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date_time ON bookings(date, time);

CREATE TABLE IF NOT EXISTS admin_users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  username      TEXT    NOT NULL UNIQUE,
  password_hash TEXT    NOT NULL,
  salt          TEXT    NOT NULL,
  display_name  TEXT,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  token      TEXT PRIMARY KEY,
  username   TEXT    NOT NULL,
  created_at TEXT    NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT    NOT NULL
);
`;

function open(): DatabaseSync {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const database = new DatabaseSync(DB_PATH);
  database.exec("PRAGMA busy_timeout = 5000");
  database.exec("PRAGMA journal_mode = WAL");
  database.exec("PRAGMA foreign_keys = ON");
  database.exec(SCHEMA);
  seedAdmin(database);
  return database;
}

function getDb(): DatabaseSync {
  if (!global.__aureumBilDb) {
    global.__aureumBilDb = open();
  }
  return global.__aureumBilDb;
}

export const db: DatabaseSync = new Proxy({} as DatabaseSync, {
  get(_target, prop) {
    const conn = getDb() as unknown as Record<string | symbol, unknown>;
    const value = conn[prop];
    return typeof value === "function" ? (value as (...a: unknown[]) => unknown).bind(conn) : value;
  },
});

function seedAdmin(database: DatabaseSync) {
  const row = database
    .prepare("SELECT COUNT(*) AS n FROM admin_users")
    .get() as { n: number };
  if (row.n > 0) return;

  const password = process.env.ADMIN_PASSWORD ?? "admin";
  const { hash, salt } = hashPassword(password);
  database
    .prepare(
      "INSERT INTO admin_users (username, password_hash, salt, display_name) VALUES (?, ?, ?, ?)"
    )
    .run("admin", hash, salt, "Verkstad");
}
