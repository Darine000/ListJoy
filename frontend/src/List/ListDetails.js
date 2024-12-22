import { useState } from "react";
import { useParams } from "react-router-dom";
import { useShoppingList } from "../List/ShoppingListProvider";
import { useUser } from "../User/UserProvider";
import ItemList from "../Item/ItemList";
import { t } from "i18next";

function ListDetails() {
  const { listId } = useParams();
  const { shoppingLists, updateListName, addMember, removeMember } = useShoppingList();
  const { loggedInUser, users } = useUser();
  const [newName, setNewName] = useState("");
  const [newMemberId, setNewMemberId] = useState("");


  const shoppingList = shoppingLists.find((list) => list.id === listId);


  if (!shoppingList) {
    return <div>List not found</div>;
  }

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

  return (
    <div>
      <h3>{ shoppingList.name || t("newList") }</h3>
      {loggedInUser === shoppingList.owner && (
        <div className="input-group">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={t("newNameList")}
          />
          <button onClick={handleUpdateName}>{("updateName")}</button>
        </div>
      )}

      <h4>{t("member")}</h4>
      <ul>
        {shoppingList.members.map((memberId) => {
          const member = users.find((user) => user.id === memberId);
          return (
            <li key={memberId}>
              {member ? member.name : memberId}
              {(loggedInUser === shoppingList.owner || loggedInUser === memberId) && (
                <button onClick={() => removeMember(memberId)}>
                  {loggedInUser === memberId ? t("confirmLeaveMember") : t("confirmRemoveMember")}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {loggedInUser === shoppingList.owner && (
        <div className="input-group">
          <input
            type="text"
            value={newMemberId}
            onChange={(e) => setNewMemberId(e.target.value)}
            placeholder={t("newMember")}
          />
          <button onClick={handleAddMember}>{("addNewMember")}</button>
        </div>
      )}

      <h4>{("listItem")}</h4>
      <ItemList />
    </div>
  );
}

export default ListDetails;