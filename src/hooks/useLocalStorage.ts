import { SaveToLocalStorage, ReadFromLocalStorage, RemoveFromLocalStorage } from "../utils/LocalStorageUtil";

export const useLocalStorage = (key: string) => {
  const setItem = <T>(value: T): boolean => SaveToLocalStorage<T>(key, value);
  const getItem = <T>(): T | undefined => ReadFromLocalStorage<T>(key);
  const removeItem = (): boolean => RemoveFromLocalStorage(key);
  return { getItem, setItem, removeItem };
};
