import { useState } from "react";
import { useShoppingList } from "./ShoppingListProvider";
import { useUser } from "./UserProvider";

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
      <h4>Členové</h4>
      <ul>
        {shoppingList.members.map((memberId) => {
          const member = users.find((user) => user.id === memberId);
          return (
            <li key={memberId}>
              {member ? member.name : memberId}
              {(loggedInUser === shoppingList.owner || loggedInUser === memberId) && (
                <button onClick={() => removeMember(memberId)}>
                  {loggedInUser === memberId ? "Odejít" : "Smazat"}
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
            placeholder="ID nového člena"
          />
          <button onClick={handleAddMember} className="primary">Přidat</button>
        </div>
      )}
    </div>
  );
}

export default MemberList;