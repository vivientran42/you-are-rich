import { openDB } from "idb";

const DB_NAME = "appDB";
const DB_VERSION = 1;

const STORE_ENTRIES = "entries";
const STORE_CURRENTS = "currents";

export const initDb = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_ENTRIES)) {
        db.createObjectStore(STORE_ENTRIES, {
          keyPath: "id",
          autoIncrement: true,
        });
      }

      if (!db.objectStoreNames.contains(STORE_CURRENTS)) {
        db.createObjectStore(STORE_CURRENTS, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });

  return db;
};
