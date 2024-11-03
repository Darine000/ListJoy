import { createContext, useContext } from "react";
import { useShoppingList } from "./ShoppingListProvider";

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
    const { setShoppingList } = useShoppingList();

  const addItem = (itemName) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: [...prevList.items, { id: Date.now().toString(), name: itemName, resolved: false }],
    }));
  };

  const removeItem = (itemId) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: prevList.items.filter((item) => item.id !== itemId),
    }));
  };

  const toggleItemResolved = (itemId) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: prevList.items.map((item) =>
        item.id === itemId ? { ...item, resolved: !item.resolved } : item
      ),
    }));
  };

  const value = {
    addItem,
    removeItem,
    toggleItemResolved,
  };

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export const useItem = () => useContext(ItemContext);