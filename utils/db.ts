import { Database } from "bun:sqlite";

export const db = new Database(
  "file:svg-in-bun?mode=memory&cache=shared",
  0x42
);

db.run(
  "CREATE TABLE IF NOT EXISTS definitions (hash TEXT PRIMARY KEY, value TEXT NOT NULL, inlined INTEGER DEFAULT false) WITHOUT ROWID"
);

export const insert_definition = db.prepare(
  "INSERT INTO definitions(hash, value) VALUES (?, ?) ON CONFLICT DO NOTHING"
);
export const get_defnitions = db.prepare("SELECT value FROM definitions WHERE NOT inlined");
export const reset_database = db.prepare("DELETE FROM definitions");
export const inline_definition = db.prepare<{value: string}, string>(
  "UPDATE definitions SET inlined = true WHERE hash = ? RETURNING value"
);
