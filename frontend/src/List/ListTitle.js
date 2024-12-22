import { useState } from "react";
import { useShoppingList } from "../List/ShoppingListProvider";
import { useUser } from "../User/UserProvider";
import { t } from "i18next";

function ListTitle() {
  const { shoppingList, updateListName } = useShoppingList();
  const { loggedInUser } = useUser();
  const [newName, setNewName] = useState("");

  const handleUpdateName = () => {
    if (newName.trim()) {
      updateListName(newName.trim());
      setNewName("");
    }
  };

  return (
    <div className="center">
      <h3>{shoppingList.name}</h3>
      {loggedInUser === shoppingList.owner && (
        <div classNmae="input-group">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={t("newNameList")}
          />
          <button onClick={handleUpdateName} className="primary">{t("changeName")}</button>
        </div>
      )}
    </div>
  );
}

export default ListTitle;