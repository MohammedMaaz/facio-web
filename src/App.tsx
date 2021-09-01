import React, { useLayoutEffect } from "react";
import Router from "./components/Router";
import "./styles/global.scss";
import Theme from "./utils/theme";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initAxiosConfig } from "./utils/api";
import { AlertPopupContainer } from "./components/AlertPopup";

initAxiosConfig();

function App() {
  useLayoutEffect(() => {
    Theme.set(Theme.get().name);
  }, []);

  return (
    <div>
      <Router />
      <ToastContainer hideProgressBar transition={Slide} />
      <AlertPopupContainer />
    </div>
  );
}

export default App;
