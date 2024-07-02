import { useState, useEffect } from "react";

const useScroll = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(null);

  const scrollHandler = () => {
    setScrollTop(window.scrollY);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener(`scroll`, scrollHandler);

    return () => {
      window.removeEventListener(`scroll`, scrollHandler);
    };
  }, []);

  useEffect(() => {
    setScrollingDown(scrollTop > lastScrollTop);
    setLastScrollTop(scrollTop);
  }, [scrollTop]);

  return {
    scrollTop,
    scrollingDown
  };
};

export default useScroll;
