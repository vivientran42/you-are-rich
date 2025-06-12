import { initDb } from "./db";

export interface Entries {
  id?: number;
  time: number;
  prompt: string;
  entry: string;
}

const STORE_ENTRIES = "entries";

export const addEntry = async (entry: Entries) => {
  const db = await initDb();
  await db.add(STORE_ENTRIES, entry);
};

export const getEntries = async (): Promise<Entries[]> => {
  const db = await initDb();
  return db.getAll(STORE_ENTRIES);
};
