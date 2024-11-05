import React from "react";

import GlobalStyle from "./global";
import ContextProviders from "./contextProviders";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import CategoriePage from "./Pages/Category";
import ProtectedRoute from "./Routes/Route";
import Registration from "./Pages/Registration";

function App() {
  return (
    <ContextProviders>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute priv={true}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute priv={false}>
                <Registration />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute priv={false}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:name"
            element={
              <ProtectedRoute priv={true}>
                <CategoriePage />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      <GlobalStyle />
    </ContextProviders>
  );
}

export default App;
