import { useUser } from "../User/UserProvider";
import { t } from "i18next";
function UserSwitcher() {
  const { users, loggedInUser, switchUser } = useUser();

  return (
    <div>
      <h4>{t("userNow")} {loggedInUser}</h4>
      {users.map((user) => (
        <button key={user.id} onClick={() => switchUser(user.id)}>
          {user.name} {loggedInUser === user.id ? t("selectedUser") : ""}
        </button>
      ))}
    </div>
  );
}

export default UserSwitcher;