import { User } from "@/types/types";

const DB_NAME = "FormDB";
const STORE_NAME = "TempForm";

export const initDB = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error("Failed to open IndexedDB"));
  });
};

export const storeFormData = async (data: User): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.put({ ...data, id: "form" });

  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
};

export const setEmailStatus = async (
  isEmailVerified: boolean
): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.put({ isEmailVerified, id: "emailStatus" });
  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
};

export const deleteFormData = async (): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.delete("form");

  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
};

export const getFormData = async (): Promise<User | undefined> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const request = store.get("form");

  return new Promise((resolve) => {
    request.onsuccess = () => resolve(request.result as User | undefined);
    request.onerror = () => resolve(undefined);
  });
};

export const getEmailStatus = async (): Promise<boolean | undefined> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const request = store.get("emailStatus");

  return new Promise((resolve) => {
    request.onsuccess = () =>
      resolve(
        (request.result as { isEmailVerified: boolean })?.isEmailVerified
      );
    request.onerror = () => resolve(undefined);
  });
};
