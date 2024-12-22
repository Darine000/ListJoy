import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ShoppingListProvider } from "./List/ShoppingListProvider";
import { UserProvider } from "./User/UserProvider";
import { ThemeProvider } from "./UI/ThemeProvider";
import './UI/i18n';
import "./Chart/chartConfig";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <UserProvider>
    <ShoppingListProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ShoppingListProvider>
  </UserProvider>
);