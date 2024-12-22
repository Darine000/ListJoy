import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useShoppingList } from "../List/ShoppingListProvider";
import { useUser } from "../User/UserProvider";
import ItemList from "../Item/ItemList";
import DetailChart from "../Chart/DetailChart";

function ListDetails() {
  const { t } = useTranslation();
  const { listId } = useParams();
  const { shoppingLists, updateListName, addMember, removeMember } = useShoppingList();
  const { loggedInUser, users } = useUser();
  const [newName, setNewName] = useState("");
  const [newMemberId, setNewMemberId] = useState("");


  const shoppingList = shoppingLists.find((list) => list.id === listId);


  if (!shoppingList) {
    return <div>{t("listNotFound")}</div>;
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


  const solvedItems = shoppingList.items.filter((item) => item.resolved).length;
  const unsolvedItems = shoppingList.items.length - solvedItems;

  return (
    <div>
      <h3>{shoppingList.name || t("newList")}</h3>
      <DetailChart solvedItems={solvedItems} unsolvedItems={unsolvedItems} />

      {loggedInUser === shoppingList.owner && (
        <div className="input-group">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={t("newNameList")}
          />
          <button onClick={handleUpdateName}>{t("updateName")}</button>
        </div>
      )}

      <h4>{t("members")}</h4>
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
          <button onClick={handleAddMember}>{t("addNewMember")}</button>
        </div>
      )}

      <h4>{t("listItems")}</h4>
      <ItemList />
    </div>
  );
}

export default ListDetails;