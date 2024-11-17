import { useState } from "react";
import { useParams } from "react-router-dom"; 
import { useShoppingList } from "./ShoppingListProvider";
import { useUser } from "./UserProvider";
import ItemList from "./ItemList";

function ListDetails() {
  const { listId } = useParams();
  const {
    shoppingList,
    updateListName,
    addMember,
    removeMember,
    filteredItems,
    toggleShowResolved,
    addItem,
    removeItem,
    toggleItemResolved,
  } = useShoppingList();
  const { loggedInUser, users } = useUser();
  const [newName, setNewName] = useState("");
  const [newMemberId, setNewMemberId] = useState("");
  const [newItemName, setNewItemName] = useState("");

  const handleUpdateName = () => {
    if (newName.trim() && loggedInUser === shoppingList.owner) {
      updateListName(newName.trim());
      setNewName("");
    }
  };

  const handleAddMember = () => {
    if (newMemberId && !shoppingList.members.includes(newMemberId)) {
      addMember(newMemberId);
      setNewMemberId("");
    }
  };

  const handleAddItem = () => {
    if (newItemName.trim()) {
      addItem(newItemName.trim());
      setNewItemName("");
    }
  };

  return (
    <div>
      <h3>{shoppingList.name}</h3>
      
      {loggedInUser === shoppingList.owner && (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Новое название"
          />
          <button onClick={handleUpdateName}>Aktualizace názvu</button>
        </div>
      )}

      <h4>Účastníci:</h4>
      <ul>
        {shoppingList.members.map((memberId) => {
          const member = users.find((user) => user.id === memberId);
          return (
            <li key={memberId}>
              {member ? member.name : memberId}
              {(loggedInUser === shoppingList.owner || loggedInUser === memberId) && (
                <button onClick={() => removeMember(memberId)}>
                  {loggedInUser === memberId ? "Odejit" : "Smazat"}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {loggedInUser === shoppingList.owner && (
        <div>
          <input
            type="text"
            value={newMemberId}
            onChange={(e) => setNewMemberId(e.target.value)}
            placeholder="ID nového člena"
          />
          <button onClick={handleAddMember}>Přidání člena</button>
        </div>
      )}
        <ItemList/>
      </div>
  );
}

export default ListDetails;