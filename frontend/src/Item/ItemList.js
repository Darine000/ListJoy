import React from "react";
import { useState } from "react";
import { useItem } from "../Item/ItemProvider";
import { useShoppingList } from "../List/ShoppingListProvider";
import { t } from "i18next";

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

  // Проверка на наличие данных
  if (!filteredItems) {
    return <div>No data to display</div>;
  }

  return (
    <div className="center">
      <button onClick={toggleShowResolved} className="primary">
        {t("view")} {filteredItems.length ? t("viewAll") : t("viewUnResolved")}
      </button>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            {item.name} {item.resolved ? t("completed") : t("unCompleted")}
            <button onClick={() => toggleItemResolved(item.id)}>
              {item.resolved ? t("markUnCompleted") : t("markCompleted")}
            </button>
            <button onClick={() => removeItem(item.id)} className="delete">
              {t("delte")}
            </button>
          </li>
        ))}
      </ul>
      <div className="input-group">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder={t("newElement")}
        />
        <button onClick={handleAddItem} className="primary">
          {t("addItem")}
        </button>
      </div>
    </div>
  );
}

export default ItemList;