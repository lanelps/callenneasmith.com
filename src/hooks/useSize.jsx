import { useState, useLayoutEffect } from "react";
import { useResizeObserver } from "~hooks";

const useSize = (target) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (target.current) {
      const { width, height } = target.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, [target]);

  // Utilize the custom useResizeObserver hook
  const dimensions = useResizeObserver(target);

  // Update size state whenever dimensions change
  useLayoutEffect(() => {
    setSize(dimensions);
  }, [dimensions]);

  return size;
};

export default useSize;
