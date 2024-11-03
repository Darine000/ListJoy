import { createContext, useState, useContext } from "react";
import { useUser } from "./UserProvider";

const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const { loggedInUser } = useUser();

  const [shoppingList, setShoppingList] = useState({
    id: "1",
    name: "BILLA",
    owner: "u1",
    members: ["u2", "u3"],
    items: [
      { id: "i1", name: "Mleko", resolved: false },
      { id: "i2", name: "Chleb", resolved: true },
    ],
    showResolved: false, // Přepínač pro filtrování
  });

   // Funkce pro změnu názvu seznamu (pouze vlastník)
  const updateListName = (newName) => {
    if (loggedInUser === shoppingList.owner) {
      setShoppingList((prevList) => {
        const updatedList = { ...prevList, name: newName };
        localStorage.setItem("shoppingListName", newName); 
        return updatedList;
      });
    }
  };

    
  // Funkce pro přidání nového člena (pouze vlastník)
  const addMember = (memberId) => {
    if (loggedInUser === shoppingList.owner && !shoppingList.members.includes(memberId)) {
      setShoppingList((prevList) => ({
        ...prevList,
        members: [...prevList.members, memberId],
      }));
    }
  };

  // Funkce pro smazání člena 
  const removeMember = (memberId) => {
    if (loggedInUser === shoppingList.owner || loggedInUser === memberId) {
      setShoppingList((prevList) => ({
        ...prevList,
        members: prevList.members.filter((id) => id !== memberId),
      }));
    }
  };

    
  const toggleShowResolved = () => {
    setShoppingList((prevList) => ({
      ...prevList,
      showResolved: !prevList.showResolved,
    }));
  };

  // Získání filtrovaného seznamu položek na základě showResolved
  const filteredItems = shoppingList.items.filter(
    (item) => shoppingList.showResolved || !item.resolved
  );

  const value = {
    shoppingList,
    setShoppingList,
    toggleShowResolved,
    filteredItems,
    addMember,
    removeMember,
    updateListName,
  };

  return <ShoppingListContext.Provider value={value}>{children}</ShoppingListContext.Provider>;
};

export const useShoppingList = () => useContext(ShoppingListContext);