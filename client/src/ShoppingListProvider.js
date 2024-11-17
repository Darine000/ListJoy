import { createContext, useState, useContext } from "react";
import { useUser } from "./UserProvider";

const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const { loggedInUser } = useUser();

  // Инициализация списков покупок
  const [shoppingLists, setShoppingLists] = useState([
    {
      id: "1",
      name: "BILLA",
      owner: "u1",
      members: ["u2", "u3"],
      items: [
        { id: "i1", name: "Mleko", resolved: false },
        { id: "i2", name: "Chleb", resolved: true },
      ],
      showResolved: false,
      archived: false,
    },
    {
      id: "2",
      name: "LIDL",
      owner: "u2",
      members: ["u1", "u3"],
      items: [
        { id: "i3", name: "Syr", resolved: false },
        { id: "i4", name: "Maslo", resolved: true },
      ],
      showResolved: false,
      archived: false,
    },
    {
      id: "3",
      name: "TESCO",
      owner: "u3",
      members: ["u1", "u2"],
      items: [
        { id: "i5", name: "Jablka", resolved: false },
        { id: "i6", name: "Banany", resolved: true },
      ],
      showResolved: false,
      archived: false,
    },
  ]);

  const [currentListId, setCurrentListId] = useState("1");

  // Получаем текущий список
  const shoppingList = shoppingLists.find((list) => list.id === currentListId);

  // Функция для выбора списка
  const selectList = (listId) => {
    setCurrentListId(listId);
  };

  // Функция для добавления нового списка
  const addList = (listName) => {
    if (!listName || typeof listName !== "string" || listName.trim() === "") {
      console.error("Invalid list name");
      return;
    }

    const newList = {
      id: Date.now().toString(),
      name: listName.trim(),
      owner: loggedInUser,
      members: [loggedInUser],
      items: [],
      showResolved: false,
      archived: false,
    };

    setShoppingLists((prevLists) => [...prevLists, newList]);
    setCurrentListId(newList.id);
  };

  // Функция для архивирования списка
  const archiveList = (listId) => {
    setShoppingLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId ? { ...list, archived: !list.archived } : list
      )
    );
  };

  // Функция для удаления списка
  const deleteList = (listId) => {
    setShoppingLists((prevLists) => {
      const updatedLists = prevLists.filter((list) => list.id !== listId);
      if (currentListId === listId && updatedLists.length > 0) {
        setCurrentListId(updatedLists[0].id);
      }
      return updatedLists;
    });
  };

  // Функция для переключения отображения выполненных элементов
  const toggleShowResolved = () => {
    setShoppingLists((prevLists) =>
      prevLists.map((list) =>
        list.id === currentListId
          ? { ...list, showResolved: !list.showResolved }
          : list
      )
    );
  };

  // Функция для обновления названия списка (только для владельца)
  const updateListName = (newName) => {
    if (loggedInUser === shoppingList.owner) {
      setShoppingLists((prevLists) =>
        prevLists.map((list) =>
          list.id === currentListId ? { ...list, name: newName } : list
        )
      );
    }
  };

  // Функция для добавления нового участника (только для владельца)
  const addMember = (memberId) => {
    if (loggedInUser === shoppingList.owner && !shoppingList.members.includes(memberId)) {
      setShoppingLists((prevLists) =>
        prevLists.map((list) =>
          list.id === currentListId
            ? { ...list, members: [...list.members, memberId] }
            : list
        )
      );
    }
  };

  // Функция для удаления участника
  const removeMember = (memberId) => {
    if (loggedInUser === shoppingList.owner || loggedInUser === memberId) {
      setShoppingLists((prevLists) =>
        prevLists.map((list) =>
          list.id === currentListId
            ? { ...list, members: list.members.filter((id) => id !== memberId) }
            : list
        )
      );
    }
  };

  // Фильтрация элементов на основе showResolved
  const filteredItems = shoppingList
    ? shoppingList.items.filter((item) => shoppingList.showResolved || !item.resolved)
    : [];

  const value = {
    shoppingLists,
    currentListId,
    setCurrentListId,
    shoppingList,
    setShoppingLists,
    toggleShowResolved,
    filteredItems,
    selectList,
    addList,
    deleteList,
    archiveList,
    updateListName,
    addMember,
    removeMember,
  };

  return <ShoppingListContext.Provider value={value}>{children}</ShoppingListContext.Provider>;
};

export const useShoppingList = () => useContext(ShoppingListContext);