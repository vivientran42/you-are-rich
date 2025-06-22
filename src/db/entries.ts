import { initDb } from "./db";

export interface Entries {
  id?: number;
  date: string;
  prompt: string;
  entry: string;
  currentId: number;
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
