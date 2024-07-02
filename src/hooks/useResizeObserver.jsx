import { useState, useEffect } from "react";

// Custom hook to observe resize events
const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const observeTarget = ref?.current;
    if (!observeTarget) return;

    // Update dimensions function
    const updateDimensions = () => {
      setDimensions({
        width: observeTarget.offsetWidth,
        height: observeTarget.offsetHeight
      });
    };

    // Initialize dimensions
    updateDimensions();

    // Create an observer
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    // Observe the target
    resizeObserver.observe(observeTarget);

    // Cleanup function
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]); // Depend on ref to re-run if it changes

  return dimensions;
};

export default useResizeObserver;
