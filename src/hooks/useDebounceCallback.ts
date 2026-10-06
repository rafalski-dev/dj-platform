import { useRef } from "react";

export function useDebounceCallback(fn: (arg: string) => void, delay: number) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedHandleChange = (value: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => fn(value), delay);
  };

  const cancel = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return [debouncedHandleChange, cancel] as const;
}
