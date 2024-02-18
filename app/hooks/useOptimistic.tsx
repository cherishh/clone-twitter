import { useCallback, useEffect, useRef, useState, useLayoutEffect } from "react";

export default function useOptimistic<T, P>(passthrough: T, reducer: (state: T, payload: P) => T) {
  const [value, setValue] = useState(passthrough);

  useEffect(() => {
    setValue(passthrough);
  }, [passthrough]);

  const reducerRef = useRef(reducer);
  useLayoutEffect(() => {
    reducerRef.current = reducer;
  }, []);

  const dispatch = useCallback((payload: P) => {
    setValue(reducerRef.current(passthrough, payload));
  }, [passthrough]);

  return [value, dispatch] as const;
}

function useOptimisticSimpleVer<T, P>(passthrough: T, reducer: (state: T, payload: P) => T): [T, (payload: P) => void] {
  const [value, setValue] = useState(passthrough);

  useEffect(() => {
      setValue(passthrough);
  }, [passthrough]);

  return [value, (payload) => setValue(reducer(passthrough, payload))]
}
