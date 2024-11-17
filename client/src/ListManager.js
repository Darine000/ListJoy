import { useState } from "react";
import { useShoppingList } from "./ShoppingListProvider";
import { useUser } from "./UserProvider";

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
      <h4>Správa seznamu:</h4>
      <button onClick={toggleShowResolved}>
        {filteredItems.length ? "Zobrazit vše" : "Zobrazit pouze aktivní"}
      </button>
      <button onClick={handleToggleArchived}>
        {showArchived ? "Skrýt archivované" : "Zobrazit archivované"}
      </button>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            {item.name} {item.resolved ? "(Archivováno)" : "(Aktivně)"}
            {loggedInUser === shoppingList.owner && (
              <button onClick={() => handleDeleteList(item.id)}>Smazat</button>
            )}
          </li>
        ))}
      </ul>
      <div className="input-group">
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Název nového seznamu"
        />
        <button onClick={handleAddList}>Přidat seznam</button>
      </div>
    </div>
  );
}

export default ListManager;