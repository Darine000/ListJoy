import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  cs: {
    translation: {
        //HomePage
        confirmDelete: "Opravdu chcete tento seznam odstranit?",
        confirmUnArchived: "Jste si jisti, že chcete tento seznam rozbalit?",
        confirmArchived: "Určitě chcete tento seznam archivovat",
        hideArchived: "Skrýt archivované",
        showArchived: "Zobrazit archivované",
        titleList: "Seznamy:",
        detail: "Více",
        unArchiveList: "Rozbalit",
        archiveList: "Archivovat", 
        delete: "Smazat", 
        newNameList: "Název nového seznamu",
        createNewNameList: "Přidání seznamu",
        //UserSwitcher
        userNow: "Aktuální uživatel:",
        selectedUser: "(Vybran)",
        //MemberList
        member: "Členové",
        confirmLeaveMember: "Odejít",
        confirmRemoveMember: "Smazat",
        newMember: "ID nového člena",
        addNewMember: "Přidat",
        //ListTitle
        changeName: "Změnit název",
        // ListManager
        manageList: "Správa seznamu:",
        showAll: "Zobrazit vše",
        archived: "(Archivováno)", 
        actively: "(Aktivně)",
        createList: "Přidat seznam",
        //ListDetail
        listNotFound: "Seznam nenalezen",
        newList: "Nový seznam",
        newNameList: "Nový název seznamu",
        updateName: "Aktualizovat název",
        members: "Členové",
        confirmLeaveMember: "Odejít",
        confirmRemoveMember: "Odstranit člena",
        newMember: "ID nového člena",
        addNewMember: "Přidat člena",
        listItems: "Položky seznamu",
        //ItemList
        view: "Zobrazit", 
        viewAll: "Všechny",
        viewUnResolved: "Pouze nevyřešené", 
        completed: "(Dokončeno)", 
        unCompleted: "(Nedokončeno)",
        markUnCompleted: "Zrušení označení", 
        markCompleted: "Označit vyplněno",
        newElement: "Nový element",
        addItem: "Přidat položku",
        //ListChart
        noDataForChart: "Pro graf nejsou k dispozici žádná data",
        noListsAvailable: "Žádné seznamy nejsou k dispozici",
    },
  },
  en: {
    translation: {
        //HomePage
        confirmDelete: "Are you sure you want to delete this list?",
        confirmUnArchived: "Are you sure you want to extract this list?",
        confirmArchived: "Are you sure you want to archive this list",
        hideArchived: "Hide archived",
        showArchived: "Show archived",
        titleList: "Lists:",
        detail: "More",
        unArchiveList: "Expand",
        archiveList: "Archive", 
        delete: "Delete", 
        newNameList: "Name of new list",
        createNewNameList: "Add list",
        //UserSwitcher
        userNow: "Current user:",
        selectedUser: "(Selected)",
        //MemberList
        member: "Member",
        confirmLeaveMember: "Leave",
        confirmRemoveMember: "Delete",
        newMember: "New member ID",
        addNewMember: "Add",
        //ListTitle
        changeName: "Change name",
        //ListManager
        manageList: "Manage list:",
        showAll: "Show All",
        archived: "(Archived)", 
        active: "(Active)",
        createList: "Add list",
        //ListDetail
        listNotFound: "List not found",
        newList: "New List",
        newNameList: "New List Name",
        updateName: "Update Name",
        members: "Members",
        confirmLeaveMember: "Leave",
        confirmRemoveMember: "Remove Member",
        newMember: "New Member ID",
        addNewMember: "Add Member",
        listItems: "List Items",
        // ItemList
        view: "view", 
        viewAll: "All",
        viewUnResolved: "Only unresolved", 
        completed: "(Completed)", 
        unCompleted: "(Uncompleted)",
        markUncompleted: "Uncompleted mark", 
        markCompleted: "Mark Completed",
        newElement: "New element",
        addItem: "Add item",
        //ListChart
        noDataForChart: "No data available for chart",
        noListsAvailable: "No lists available",
    },
  },
};

i18n
    .use(initReactI18next)
    .init({
  resources,
  lng: "cs", // Язык по умолчанию
        interpolation: {
            escapeValue: false
    },
});

export default i18n;