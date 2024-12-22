import { useState } from "react";
import { useShoppingList } from "./List/ShoppingListProvider";
import { useUser } from "./User/UserProvider";
import { Link } from "react-router-dom";
import { t } from "i18next";
import ListChart from "./Chart/ListChart";

function HomePage() {
  const { shoppingLists, selectList, addList, deleteList, archiveList } = useShoppingList();
  const { loggedInUser } = useUser();
  const [newListName, setNewListName] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  // Фильтрация списков по статусу (архивированные/активные)
  const filteredLists = shoppingLists.filter((list) =>
    showArchived ? list.archived : !list.archived
  );

  // Подготовка данных для диаграммы
  const labels = shoppingLists.map((list) => list.name); // Названия списков
  const dataValues = shoppingLists.map((list) => list.items.length); // Количество элементов в каждом списке

  // Обработчик для добавления нового списка
  const handleAddList = () => {
    if (newListName.trim()) {
      addList(newListName.trim());
      setNewListName("");
    }
  };

  // Переключение отображения архивированных списков
  const handleToggleArchived = () => {
    setShowArchived(!showArchived);
  };

  // Удаление списка
  const handleDeleteList = (listId) => {
    const confirmDelete = window.confirm(t("confirmDelete"));
    if (confirmDelete) {
      deleteList(listId);
    }
  };

  // Архивация/Разархивация списка
  const handleArchiveList = (listId, isArchived) => {
    const confirmArchive = window.confirm(
      isArchived ? t("confirmUnArchived") : t("confirmArchived")
    );
    if (confirmArchive) {
      archiveList(listId);
    }
  };

  return (
    <div>
      <h4>{t("titleList")}</h4>

      {/* Диаграмма с данными */}
      {shoppingLists.length > 0 ? (
        <ListChart labels={labels} dataValues={dataValues} />
      ) : (
        <p>{t("noDataForChart")}</p>
      )}

      {/* Переключатель архивированных списков */}
      <button onClick={handleToggleArchived}>
        {showArchived ? t("hideArchived") : t("showArchived")}
      </button>

      {/* Отображение списков */}
      <div className="list-tiles">
        {filteredLists.length > 0 ? (
          filteredLists.map((list) => (
            <div key={list.id} className="list-card">
              <h5>{list.name}</h5>
              <Link to={`/list/${list.id}`} onClick={() => selectList(list.id)}>
                {t("detail")}
              </Link>
              {loggedInUser === list.owner && (
                <>
                  <button onClick={() => handleDeleteList(list.id)}>
                    {t("delete")}
                  </button>
                  <button onClick={() => handleArchiveList(list.id, list.archived)}>
                    {list.archived ? t("unArchiveList") : t("archiveList")}
                  </button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>{t("noListsAvailable")}</p>
        )}
      </div>

      {/* Форма для добавления нового списка */}
      <div className="input-group">
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder={t("newNameList")}
        />
        <button onClick={handleAddList}>{t("createNewNameList")}</button>
      </div>
    </div>
  );
}

export default HomePage;