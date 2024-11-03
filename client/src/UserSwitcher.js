import { useUser } from "./UserProvider";

function UserSwitcher() {
  const { users, loggedInUser, switchUser } = useUser();

  return (
    <div>
      <h4>Aktuální uživatel: {loggedInUser}</h4>
      {users.map((user) => (
        <button key={user.id} onClick={() => switchUser(user.id)}>
          {user.name} {loggedInUser === user.id ? "(Vybran)" : ""}
        </button>
      ))}
    </div>
  );
}

export default UserSwitcher;