import { useEffect, useState } from "react";

import { SaveToLocalStorage, ReadFromLocalStorage } from "../utils/LocalStorageUtil";

export const useLocalStorageState = <T>(key: string, initialState: T): [T, (value: T) => void] => {
  const [value, setValueInternally] = useState<T>(initialState)

  useEffect(() => {
    const localValue = ReadFromLocalStorage<T>(key);
    if (localValue) {
      setValueInternally(localValue);
    }
  }, [key]);

  const setValue = (newValue: T) => {
    SaveToLocalStorage<T>(key, newValue);
    setValueInternally(newValue);
  }

  return [ value, setValue ];
};
