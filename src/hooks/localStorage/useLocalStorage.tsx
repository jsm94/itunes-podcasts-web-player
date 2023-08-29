export const useLocalStorage = <T,>() => {
  const defaultExpirationTime = 1000 * 60 * 60 * 24 * 1; // 1 day

  const setItem = (
    key: string,
    value: T,
    expirationTime = defaultExpirationTime
  ) => {
    if (value instanceof Map) {
      localStorage.setItem(key, JSON.stringify([...value]));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
    localStorage.setItem(
      `${key}_exp`,
      JSON.stringify(Date.now() + expirationTime)
    );
  };

  const getItem = (key: string): T | null => {
    const item = localStorage.getItem(key);
    const exp = localStorage.getItem(`${key}_exp`);
    if (exp && new Date().getTime() > JSON.parse(exp)) {
      removeItem(key);
      removeItem(`${key}_exp`);
      return null;
    }
    return item ? JSON.parse(item) : null;
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}_exp`);
  };

  return {
    setItem,
    getItem,
    removeItem,
  };
};
