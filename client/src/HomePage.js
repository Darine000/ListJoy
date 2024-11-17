import { useState } from "react";
import { useShoppingList } from "./ShoppingListProvider";
import { useUser } from "./UserProvider";
import { Link } from "react-router-dom";

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
    const confirmDelete = window.confirm("Opravdu chcete tento seznam odstranit?");
    if (confirmDelete) {
      deleteList(listId);
    }
  };

  // Potvrzení archivace seznamu
  const handleArchiveList = (listId, isArchived) => {
    const confirmArchive = window.confirm(
      isArchived
        ? "Jste si jisti, že chcete tento seznam rozbalit?"
        : "Určitě chcete tento seznam archivovat?"
    );
    if (confirmArchive) {
      archiveList(listId);
    }
  };

  return (
    <div>
      <h4>Seznamy:</h4>
      <button onClick={handleToggleArchived}>
        {showArchived ? "Skrýt archivované" : "Zobrazit archivované"}
      </button>
      <div className="list-tiles">
        {shoppingLists
          .filter((list) => (showArchived ? list.archived : !list.archived))
          .map((list) => (
            <div key={list.id} className="list-card">
              <h5>{list.name}</h5>
              <Link to={`/list/${list.id}`} onClick={() => selectList(list.id)}>
                Více
              </Link>
              {loggedInUser === list.owner && (
                <>
                  <button onClick={() => handleDeleteList(list.id)}>Smazat</button>
                  <button onClick={() => handleArchiveList(list.id, list.archived)}>
                    {list.archived ? "Rozbalit" : "Archivovat"}
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
          placeholder="Název nového seznamu"
        />
        <button onClick={handleAddList}>Přidání seznamu</button>
      </div>
    </div>
  );
}

export default HomePage;