import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import store from "./store";
import theme from "./theme";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import environment from "./environment";

ReactDOM.render(
  <Auth0Provider
    domain={environment.AUTH_DOANIN}
    clientId={environment.AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
    </Auth0Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
