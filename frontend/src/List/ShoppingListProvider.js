import { createContext, useState, useContext, useEffect, useCallback } from "react";
import { useUser } from "../User/UserProvider";


const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const { loggedInUser } = useUser();
  const [shoppingLists, setShoppingLists] = useState([]);
  const [currentListId, setCurrentListId] = useState(null);
  const [useMockData, setUseMockData] = useState(true); // Режим работы (mock или сервер)

  const shoppingList = shoppingLists.find((list) => list.id === currentListId);

  const filteredItems = shoppingList
    ? shoppingList.items.filter((item) => shoppingList.showResolved || !item.resolved)
    : [];
  
  const toggleShowResolved = () => {
    if (shoppingList) {
      console.log("Toggling showResolved for list:", shoppingList.id);
      setShoppingLists((prevLists) =>
        prevLists.map((list) =>
          list.id === currentListId
            ? { ...list, showResolved: !list.showResolved }
            : list 
      )
      );
    };
  }
  // Мемоизированная функция для загрузки данных
  const fetchShoppingLists = useCallback(async () => {
    if (useMockData) {
      // Загрузка фиктивных данных
      setShoppingLists([
        {
          id: "1",
          name: "BILLA",
          owner: "u1",
          members: ["u2", "u3"],
          items: [
            { id: "i1", name: "Mléko", resolved: false },
            { id: "i2", name: "Chléb", resolved: true },
          ],
          archived: false,
        },
        {
          id: "2",
          name: "LIDL",
          owner: "u2",
          members: ["u1", "u3"],
          items: [
            { id: "i3", name: "Máslo", resolved: false },
            { id: "i4", name: "Sýr", resolved: true },
          ],
          archived: false,
        },
      ]);
      setCurrentListId("1");
    } else {
      // Загрузка данных с сервера
      try {
        const response = await fetch("/api/shopping-lists");
        const data = await response.json();
        setShoppingLists(data.shoppingLists);
        setCurrentListId(data.shoppingLists[0]?.id || null);
      } catch (error) {
        console.error("Ошибка загрузки данных с сервера:", error);
      }
    }
  }, [useMockData]);

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    fetchShoppingLists();
  }, [fetchShoppingLists]);

  // Функция для создания нового списка
  const addList = async (listName) => {
    const newList = {
      id: Date.now().toString(),
      name: listName.trim() || "Nový seznam",
      owner: loggedInUser,
      members: [loggedInUser],
      items: [],
      showResolved: true,
      archived: false,
    };

    if (useMockData) {
      setShoppingLists((prevLists) => [...prevLists, newList]);
      setCurrentListId(newList.id);
    } else {
      try {
        const response = await fetch("/api/shopping-lists", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newList),
        });
        const createdList = await response.json();
        setShoppingLists((prevLists) => [...prevLists, createdList.shoppingList]);
        setCurrentListId(createdList.shoppingList.id);
      } catch (error) {
        console.error("Ошибка создания списка на сервере:", error);
      }
    }
  };

  const deleteList = async (listId) => {
    if (useMockData) {
      setShoppingLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    } else {
      try {
        await fetch(`/api/shopping-lists/${listId}`, { method: "DELETE" });
        setShoppingLists((prevLists) => prevLists.filter((list) => list.id !== listId));
      } catch (error) {
        console.error("Ошибка удаления списка на сервере:", error);
      }
    }
  };

  const value = {
    shoppingLists,
    shoppingList,
    filteredItems,
    toggleShowResolved,
    setShoppingLists,
    setCurrentListId,
    currentListId,
    useMockData,
    setUseMockData,
    addList,
    deleteList,
  };

  return <ShoppingListContext.Provider value={value}>{children}</ShoppingListContext.Provider>;
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
  throw new Error("useShoppingList must be used within a ShoppingListProvider");
}
  return context;
  ; }