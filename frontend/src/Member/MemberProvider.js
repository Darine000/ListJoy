import { createContext, useContext } from "react";
import { useShoppingList } from "../List/ShoppingListProvider";
import { useUser } from "../User/UserProvider";

const MemberContext = createContext();

export const MemberProvider = ({ children }) => {
  const { shoppingList, setShoppingList } = useShoppingList();
  const { loggedInUser } = useUser();

  const addMember = (memberId) => {
    if (loggedInUser === shoppingList.owner && !shoppingList.members.includes(memberId)) {
      setShoppingList((prevList) => ({
        ...prevList,
        members: [...prevList.members, memberId],
      }));
    }
  };

  const removeMember = (memberId) => {
    if (loggedInUser === shoppingList.owner || loggedInUser === memberId) {
      setShoppingList((prevList) => ({
        ...prevList,
        members: prevList.members.filter((id) => id !== memberId),
      }));
    }
  };

  const value = { addMember, removeMember };

  return <MemberContext.Provider value={value}>{children}</MemberContext.Provider>;
};

export const useMember = () => useContext(MemberContext);