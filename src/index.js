import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import reportWebVitals from './reportWebVitals';
import {ApiRoutes} from './config/routes';
import App from './App';
import './index.css';

const {urls} = ApiRoutes()

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />

      <Routes>
        <Route path="/">
        <Route index element={urls.children[0].element} />
          {urls.children.map(({path, element}, i) => (
            <Route key={i} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
