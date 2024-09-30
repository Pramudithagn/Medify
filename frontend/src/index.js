import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import keyCloakService from "./auth/keycloakService";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   // <React.StrictMode>
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>
//   // </React.StrictMode>
// );

const renderApp = function () {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

keyCloakService.callLogin(renderApp);
