import { initDb } from "./db";

export interface Currents {
  id?: number;
  mp3?: number;
  artist?: string;
  book?: string;
  author?: string;
  mp4?: string;
}

const STORE_CURRENTS = "currents";

export const addCurrents = async (current: Currents) => {
  const db = await initDb();
  return db.add(STORE_CURRENTS, current);
};

export const getCurrents = async (): Promise<Currents[]> => {
  const db = await initDb();
  return db.getAll(STORE_CURRENTS);
};

export const updateCurrents = async (updatedCurrent: Currents): Promise<void> => {
    if (typeof updatedCurrent.id !== 'number') {
      throw new Error('Cannot update: "id" is required in Currents object.');
    }
  
    const db = await initDb();
    const tx = db.transaction(STORE_CURRENTS, 'readwrite');
    const store = tx.objectStore(STORE_CURRENTS);
  
    const existing = await store.get(updatedCurrent.id);
    if (!existing) {
      throw new Error(`No record found with id ${updatedCurrent.id}`);
    }
  
    const merged = { ...existing, ...updatedCurrent };
    await store.put(merged);
    await tx.done;
  };
