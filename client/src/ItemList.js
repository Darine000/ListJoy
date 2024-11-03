import { useState } from "react";
import { useItem } from "./ItemProvider";
import { useShoppingList } from "./ShoppingListProvider";

function ItemList() {
  const { filteredItems, toggleShowResolved } = useShoppingList();
  const { addItem, removeItem, toggleItemResolved } = useItem();
  const [newItemName, setNewItemName] = useState("");

  const handleAddItem = () => {
    if (newItemName.trim()) {
      addItem(newItemName.trim());
      setNewItemName("");
    }
  };

  return (
    <div className="center">
      <h4>Položky seznamu</h4>
      <button onClick={toggleShowResolved} className="primary">Zobrazit {filteredItems.length ? "všechny" : "pouze nevyřešené"}</button>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            {item.name} {item.resolved ? "(Dokončeno)" : "(Nedokončeno)"}
            <button onClick={() => toggleItemResolved(item.id)}>
              {item.resolved ? "Zrušení označení" : "Označit vyplněno"}
            </button>
            <button onClick={() => removeItem(item.id)} className="delete">Odstranit</button>
          </li>
        ))}
      </ul>
      <div className="input-group">
      <input
        type="text"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder="Nový element"
      />
        <button onClick={handleAddItem} className="primary">Přidat položku</button>
      </div>
    </div>
  );
}

export default ItemList;