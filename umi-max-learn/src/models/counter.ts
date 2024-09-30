import { useCallback, useState } from 'react';

export default function useCounter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((state) => state + 1);
  }, []);

  return {
    count,
    setCount,
    increment,
  };
}
