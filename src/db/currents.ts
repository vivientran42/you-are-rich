import { initDb } from "./db";

export interface Currents {
  id?: number;
  mp3?: string | undefined;
  artist?: string | undefined;
  book?: string | undefined;
  author?: string | undefined;
  mp4?: string | undefined;
}

const STORE_CURRENTS = "currents";

export const addCurrents = async (current: Currents) => {
  const db = await initDb();
  return db.add(STORE_CURRENTS, current);
};

export const getAllCurrents = async (): Promise<Currents[]> => {
  const db = await initDb();
  return db.getAll(STORE_CURRENTS);
};

export const getLatestCurrents = async (): Promise<Currents[]> => {
  const db = await initDb();
  const all = await db.getAll(STORE_CURRENTS);
  if (all.length === 0) return [];
  return [all[all.length - 1]];
};
