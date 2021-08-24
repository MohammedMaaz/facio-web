import React, { useLayoutEffect } from "react";
import Router from "./components/Router";
import ThemeSwitch from "./components/ThemeSwitch";
import "./styles/global.scss";
import Theme from "./utils/theme";

function App() {
  useLayoutEffect(() => {
    Theme.set(Theme.get().name);
  }, []);

  return (
    <div>
      <Router />
      <ThemeSwitch />
    </div>
  );
}

export default App;
