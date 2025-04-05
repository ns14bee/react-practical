import { useState, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay: number) => {
  const [debounce, setDebouce] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouce(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounce;
};
