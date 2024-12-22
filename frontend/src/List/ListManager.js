import { useState } from "react";
import { useShoppingList } from "../List/ShoppingListProvider";
import { useUser } from "../User/UserProvider";
import { t } from "i18next";

function ListManager() {
  const { shoppingList, setShoppingList, toggleShowResolved, filteredItems } = useShoppingList();
  const { loggedInUser } = useUser();
  const [newListName, setNewListName] = useState("");
  const [showArchived, setShowArchived] = useState(false);


  const handleAddList = () => {
    if (newListName.trim()) {
      setShoppingList((prev) => ({
        ...prev,
        items: [
          ...prev.items,
          { id: Date.now().toString(), name: newListName.trim(), resolved: false },
        ],
      }));
      setNewListName("");
    }
  };

  // Funkce pro smazání seznamu (dostupná pouze vlastníkovi)
  const handleDeleteList = (itemId) => {
    if (loggedInUser === shoppingList.owner) {
      setShoppingList((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== itemId),
      }));
    }
  };

  // Přepínání zobrazení archivovaných položek
  const handleToggleArchived = () => {
    setShowArchived(!showArchived);
  };

  return (
    <div>
      <h4>{("manageList")}</h4>
      <button onClick={toggleShowResolved}>
        {filteredItems.length ? t("Zobrazit vše") : "Zobrazit pouze aktivní"}
      </button>
      <button onClick={handleToggleArchived}>
        {showArchived ? t("showAll") : t("showArchived")}
      </button>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            {item.name} {item.resolved ? t("archived") : t("actively")}
            {loggedInUser === shoppingList.owner && (
              <button onClick={() => handleDeleteList(item.id)}>{t("delete")}</button>
            )}
          </li>
        ))}
      </ul>
      <div className="input-group">
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder={t("newNameList")}
        />
        <button onClick={handleAddList}>{t("createList")}</button>
      </div>
    </div>
  );
}

export default ListManager;