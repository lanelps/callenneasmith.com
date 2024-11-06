/* eslint-disable camelcase */
import React, { createContext, useEffect, useState, useMemo } from "react";
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

  const [activeFilters, setActiveFilters] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [activeExpand, setActiveExpand] = useState(null);

  // ---------------------------------------------------------------------------
  // methods

  // ...

  // ---------------------------------------------------------------------------
  // lifecycle

  useEffect(() => {
    if (typeof window !== `undefined` && window?.location?.pathname) {
      setPathname(window?.location.pathname);
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
    activeFilters,
    setActiveFilters,
    allProjects,
    setAllProjects,
    activeExpand,
    setActiveExpand
  }));

  return (
    <AppContext.Provider value={providerProps}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
