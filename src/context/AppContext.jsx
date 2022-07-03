/* eslint-disable camelcase */
import React, { createContext, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { globalHistory } from "@reach/router";

export const AppContext = createContext({});

/** ============================================================================
 * @context
 * Global application data.
 */
const AppProvider = ({ children }) => {
  // ---------------------------------------------------------------------------
  // context / ref / state

  const [pathname, setPathname] = useState(null);
  const [menuActive, setMenuActive] = useState(false);

  const [introInView, setIntroInView] = useState(true);

  const [popOuts, setPopOuts] = useState([]);
  const [activePopOut, setActivePopOut] = useState(null);

  useEffect(() => {
    setPopOuts((prev) => {
      if (prev.length <= 1) return prev;

      const itemIndex = prev.findIndex((item) => item.id === activePopOut);

      if (itemIndex > -1) {
        const newPops = [...prev];
        const [poppedOut] = newPops.splice(itemIndex, 1);
        newPops.push(poppedOut);
        return newPops;
      }

      return prev;
    });
  }, [activePopOut]);

  // ---------------------------------------------------------------------------
  // methods

  // ...

  // ---------------------------------------------------------------------------
  // lifecycle

  useEffect(() => {
    if (typeof window !== `undefined` && window?.location?.pathname) {
      setPathname(window.location.pathname);
    }

    return globalHistory.listen(({ location }) => {
      setPathname(location.pathname);
    });
  }, []);

  // ---------------------------------------------------------------------------
  // render

  const providerProps = useMemo(() => ({
    pathname,
    menuActive,
    setMenuActive,
    introInView,
    setIntroInView,
    activePopOut,
    setActivePopOut,
    popOuts,
    setPopOuts
  }));

  return (
    <AppContext.Provider value={providerProps}>{children}</AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppProvider;
