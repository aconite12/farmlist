// src/sqlite.ts
import initSqlJs, { Database, SqlJsStatic } from 'sql.js'

// These will hold our initialized SQL.js module and the single Database instance:
let SQL: SqlJsStatic | null = null
let db: Database | null = null

/**
 * Opens (or creates) our in-memory SQLite database via SQL.js.
 * If it’s the first time, we also run `CREATE TABLE IF NOT EXISTS users (…)`.
 */
export async function openDatabase(): Promise<Database> {
  if (db) {
    // If we already opened once, just return it.
    return db
  }

  // Lazily load the SQL.js WASM module:
  if (!SQL) {
    SQL = await initSqlJs({
      // This tells SQL.js where to load its "sql-wasm.wasm" file from.
      // Vite will serve from node_modules/sql.js/dist/
      locateFile: (file) => `/node_modules/sql.js/dist/${file}`,
    })
  }

  // Create a brand-new in-memory database:
  db = new SQL.Database()

  // Ensure the 'users' table exists:
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id       TEXT PRIMARY KEY,
      fullname TEXT NOT NULL,
      username TEXT NOT NULL,
      email    TEXT NOT NULL,
      role     TEXT NOT NULL,
      notes    TEXT,
      active   INTEGER NOT NULL,
      avatar   TEXT
      -- If you need a "projects" field (array of strings), you could store JSON here,
      -- e.g. projects_json TEXT, and JSON.parse/stringify manually.
    );
  `)

  return db
}
