import { useEffect } from "react";

export const useTimeout = (
  callback,
  timeout = 0,
  { renderCancel = false } = {}
) => {
  let timeoutId;

  const cancel = () => timeoutId && clearTimeout(timeoutId);

  useEffect(
    () => {
      timeoutId = setTimeout(callback, timeout);

      return cancel;
    },
    !renderCancel
      ? [setTimeout, clearTimeout]
      : [callback, timeout, setTimeout, clearTimeout]
  );

  return cancel;
};

export default useTimeout;
