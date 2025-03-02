import { useEffect, useRef, useState } from "react";

export function useDebouncedValue<T>(value: T): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const previousValueRef = useRef<T>(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isEqual(previousValueRef.current, value)) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setDebouncedValue(value);
        previousValueRef.current = value;
      }, 300);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);

  return debouncedValue;
}

const isEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);
