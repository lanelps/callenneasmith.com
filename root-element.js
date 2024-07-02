import React from "react";

import AppProvider from "~context/AppContext.jsx";

const Provider = ({ element }) => (
  <>
    <AppProvider>{element}</AppProvider>
  </>
);

export default Provider;
