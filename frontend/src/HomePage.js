import { useState } from "react";
import { useShoppingList } from "./List/ShoppingListProvider";
import { useUser } from "./User/UserProvider";
import { Link } from "react-router-dom";
import { t } from "i18next";

function HomePage() {
  const { shoppingLists, selectList, addList, deleteList, archiveList } = useShoppingList();
  const { loggedInUser } = useUser();
  const [newListName, setNewListName] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  // Obslužný program pro přidání nového seznamu
  const handleAddList = () => {
    if (newListName.trim()) {
      addList(newListName.trim());
      setNewListName("");
    }
  };

  // Přepínání zobrazení archivovaných seznamů
  const handleToggleArchived = () => {
    setShowArchived(!showArchived);
  };

  // Potvrzení vymazání seznamu
  const handleDeleteList = (listId) => {
    const confirmDelete = window.confirm(t("confirmDelete"));
    if (confirmDelete) {
      deleteList(listId);
    }
  };

  // Potvrzení archivace seznamu
  const handleArchiveList = (listId, isArchived) => {
    const confirmArchive = window.confirm(
      isArchived
        ? t("confirmUnArchived")
        : t("confirmArchived")
    );
    if (confirmArchive) {
      archiveList(listId);
    }
  };

  return (
    <div>
      <h4>{t("titleList")}</h4>
      <button onClick={handleToggleArchived}>
        {showArchived ? t("hideArchived") : t("showArchived")}
      </button>
      <div className="list-tiles">
        {shoppingLists
          .filter((list) => (showArchived ? list.archived : !list.archived))
          .map((list) => (
            <div key={list.id} className="list-card">
              <h5>{list.name}</h5>
              <Link to={`/list/${list.id}`} onClick={() => selectList(list.id)}>
                {t("detail")}
              </Link>
              {loggedInUser === list.owner && (
                <>
                  <button onClick={() => handleDeleteList(list.id)}>{t("delete")}</button>
                  <button onClick={() => handleArchiveList(list.id, list.archived)}>
                    {list.archived ? t("unArchiveList") : t("archiveList")}
                  </button>
                </>
              )}
            </div>
          ))}
      </div>
      <div className="input-group">
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder={t("newNameList")}
        />
        <button onClick={handleAddList}>{t("createNewNameList")}</button>
      </div>
    </div>
  );
}

export default HomePage;