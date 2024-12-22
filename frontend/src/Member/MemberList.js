import { useState } from "react";
import { useShoppingList } from "../List/ShoppingListProvider";
import { useUser } from "../User/UserProvider";
import { t } from "i18next";

function MemberList() {
  const { shoppingList, addMember, removeMember } = useShoppingList();
  const { loggedInUser, users } = useUser();
  const [newMemberId, setNewMemberId] = useState("");

  const handleAddMember = () => {
    if (newMemberId && !shoppingList.members.includes(newMemberId)) {
      addMember(newMemberId);
      setNewMemberId("");
    }
  };

  return (
    <div className="center">
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
        <div className="tnput-group">
          <input
            type="text"
            value={newMemberId}
            onChange={(e) => setNewMemberId(e.target.value)}
            placeholder={t("newMember")}
          />
          <button onClick={handleAddMember} className="primary">{t("addNewMember")}</button>
        </div>
      )}
    </div>
  );
}

export default MemberList;