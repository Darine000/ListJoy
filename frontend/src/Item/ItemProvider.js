import React, { createContext, useContext } from "react";
import { useShoppingList } from "../List/ShoppingListProvider";

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const { setShoppingLists, currentListId } = useShoppingList();

  // Функция для добавления нового элемента в текущий список
  const addItem = (itemName) => {
    setShoppingLists((prevLists) =>
      prevLists.map((list) =>
        list.id === currentListId
          ? {
              ...list,
              items: [
                ...list.items,
                { id: Date.now().toString(), name: itemName, resolved: false },
              ],
            }
          : list
      )
    );
  };

  // Пример использования других функций
  const removeItem = (itemId) => {
    setShoppingLists((prevLists) =>
      prevLists.map((list) =>
        list.id === currentListId
          ? { ...list, items: list.items.filter((item) => item.id !== itemId) }
          : list
      )
    );
  };

  const toggleItemResolved = (itemId) => {
    setShoppingLists((prevLists) =>
      prevLists.map((list) =>
        list.id === currentListId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId ? { ...item, resolved: !item.resolved } : item
              ),
            }
          : list
      )
    );
  };

  const value = {
    addItem,
    removeItem,
    toggleItemResolved,
  };

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export const useItem = () => useContext(ItemContext);