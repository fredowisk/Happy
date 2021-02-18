import React from "react";

import "./styles/global.css";
import "leaflet/dist/leaflet.css";

import AppProvider from "./hooks";

import Routes from "./routes/index";

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
