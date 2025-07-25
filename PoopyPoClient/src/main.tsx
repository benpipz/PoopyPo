import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./Tailwind.css";
import { Provider } from "react-redux";
import {store} from "./store/store";
import 'leaflet/dist/leaflet.css';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
