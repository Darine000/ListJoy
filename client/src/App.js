import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { UserProvider } from "./UserProvider";
import { ShoppingListProvider } from "./ShoppingListProvider";
import { ItemProvider } from "./ItemProvider";
import { MemberProvider } from "./MemberProvider";
import UserSwitcher from "./UserSwitcher";
import HomePage from "./HomePage";
import ListDetails from "./ListDetails";
import './styles.css';

function App() {
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
                <UserSwitcher />
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