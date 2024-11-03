import React from "react";
import { UserProvider } from "./UserProvider";
import { ShoppingListProvider } from "./ShoppingListProvider";
import { ItemProvider } from "./ItemProvider";
import { MemberProvider } from "./MemberProvider";
import UserSwitcher from "./UserSwitcher";
import ListTitle from "./ListTitle";
import MemberList from "./MemberList";
import ItemList from "./ItemList";
import './styles/styles.css'; 

function App() {
  return (
    <UserProvider>
      <ShoppingListProvider>
        <MemberProvider>
          <ItemProvider>
            <div>
              <h2>ListJoy</h2>
              <UserSwitcher />
              <ListTitle />
              <MemberList />
              <ItemList />
            </div>
          </ItemProvider>
        </MemberProvider>
      </ShoppingListProvider>
    </UserProvider>
  );
}

export default App;
