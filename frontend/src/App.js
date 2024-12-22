import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { UserProvider } from "../src/User/UserProvider";
import { ShoppingListProvider, useShoppingList } from "../src/List/ShoppingListProvider";
import { ItemProvider } from "../src/Item/ItemProvider";
import { MemberProvider } from "../src/Member/MemberProvider";
import UserSwitcher from "../src/User/UserSwitcher";
import HomePage from "../src/HomePage";
import ListDetails from "./List/ListDetails";
import { useTheme } from "./UI/ThemeProvider";
import { useTranslation } from "react-i18next";
import './styles.css';


function App() {
  const { useMockData, setUseMockData } = useShoppingList();
  const { isDarkMode, toggleTheme } = useTheme();
  const {  i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }
  return (
    <UserProvider>
      <ShoppingListProvider>
        <MemberProvider>
          <ItemProvider>
            <Router>
              <div>
                <h2>
                  <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    ListJoy
                  </Link>
                </h2>
                <button onClick={toggleTheme}>
                  { isDarkMode ? "Světelný režim" : "Tmavý režim"}
                </button>
                <button onClick={() => changeLanguage("en")}>English</button>
                <button onClick={() => changeLanguage("cs")}>Čeština</button>
                <UserSwitcher />
                <h4>Režim: {useMockData ? "Mock" : "Server"}</h4>
                <button onClick={() => setUseMockData((prev) => !prev)}>
                  Přepnutí na {useMockData ? "Server" : "Mock"}
                </button>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/list/:listId" element={<ListDetails />} />
                </Routes>
              </div>
            </Router>
          </ItemProvider>
        </MemberProvider>
      </ShoppingListProvider>
    </UserProvider>
  );
}

export default App;