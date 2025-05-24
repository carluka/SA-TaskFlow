import React, { useContext, useState, useEffect } from "react";
import * as S from "./styles";
import Logo from "../../Img/Logo.png";
import TaskFill from "../../Img/taskFill.png";
import Settings from "../../Img/settings.svg";
import Folder from "../../Img/folder.svg";
import Logout from "../../Img/logout.svg";
import SidebarItem from "../../Components/SidebarItem";
import ExpandSidebarItem from "../../Components/ExpandSidebarItem";
import TaskCard from "../../Components/TaskCard";
import AddTask from "../../Components/AddTask";
import FilterTag from "../../Components/FilterTag";
import Filter from "../../Img/filter.svg";
import { DeleteContext } from "../../Contexts/deleteContext";
import { DeleteType } from "../../Contexts/deleteType";
import DeleteModal from "../../Components/DeleteModal";
import AddModal from "../../Components/AddModal";
import { AddContext } from "../../Contexts/addContext";
import { AddType } from "../../Contexts/addType";
import { Link } from "react-router-dom";
import AuthContext, { AuthType } from "../../Contexts/authContext";
import axios from "axios";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskListType } from "../../Contexts/taskType";
import { CategoriesContext } from "../../Contexts/categoriesContext";
import { CategoryContextType } from "../../Contexts/categoriesType";
import AddCategoryModal from "../../Components/AddCategoryModal";
import { AddCategoryContext } from "../../Contexts/addCategoryContext";
import { AddCategoryType } from "../../Contexts/addCategoryType";

const Home: React.FC = () => {
  const { taskList, doneTasks, notDoneTasks } = useContext(
    TaskListContext
  ) as TaskListType;
  const { addAllTasks } = useContext(TaskListContext) as TaskListType;
  const { showDelete } = useContext(DeleteContext) as DeleteType;
  const { showAdd } = useContext(AddContext) as AddType;
  const { showAddCategory } = useContext(AddCategoryContext) as AddCategoryType;
  const [listToDisplay, setListToDisplay] = useState(0);
  const { clearAllTasks } = useContext(TaskListContext) as TaskListType;

  const [allActive, setAllActive] = useState(true);
  const [doneActive, setDoneActive] = useState(false);
  const [notDoneActive, setNotDoneActive] = useState(false);

  const { setUserData } = useContext(AuthContext) as AuthType;
  const { userData } = useContext(AuthContext) as AuthType;

  const listOfLists = [taskList, doneTasks, notDoneTasks];

  const { setCategList } = useContext(CategoriesContext) as CategoryContextType;

  useEffect(() => {
    fetchTask();
    fetchCategory();
  }, []);

  function fetchTask() {
    axios
      .get("http://localhost:8000/api.php", {
        params: {
          action: "getTask",
          email: userData.email,
        },
      })
      .then(function (response) {
        addAllTasks(response.data);
      })
      .catch(function (error) {
        console.error("There was an error!", error);
      });
  }

  function fetchCategory() {
    axios
      .get("http://localhost:8000/api.php?action=getCategories", {
        params: { email: userData.email },
      })
      .then(function (response) {
        console.log(response.data);
        const updatedList = [
          { id: -1, naziv: "Brez Kategorije" },
          ...response.data,
        ];
        setCategList(updatedList);
      })
      .catch(function (error) {
        console.error("There was an error!", error);
      });
  }

  function handleAll() {
    setListToDisplay(0);
    setAllActive(true);
    setDoneActive(false);
    setNotDoneActive(false);
  }

  function handleDone() {
    setListToDisplay(1);
    setAllActive(false);
    setDoneActive(true);
    setNotDoneActive(false);
  }

  function handleNotDone() {
    setListToDisplay(2);
    setAllActive(false);
    setDoneActive(false);
    setNotDoneActive(true);
  }

  function handleLogout() {
    localStorage.removeItem("@Project:email");
    clearAllTasks();
    setUserData({ email: "" });
  }

  return (
    <S.Page>
      <S.Sidebar>
        <S.Img src={Logo} />
        <S.Tabs>
          <SidebarItem
            icon={TaskFill}
            name="Opravila"
            isActive={true}
          ></SidebarItem>
          <ExpandSidebarItem
            icon={Folder}
            name="Kategorije"
          ></ExpandSidebarItem>
        </S.Tabs>
        <Link
          to="/login"
          style={{ textDecoration: "none" }}
          onClick={handleLogout}
        >
          <SidebarItem
            icon={Logout}
            name="Odjava"
            isActive={false}
          ></SidebarItem>
        </Link>
      </S.Sidebar>
      <S.Main>
        <S.Header>Seznam opravil</S.Header>
        <S.TitleAndFilter>
          <S.Title onClick={handleDone}>Opravila </S.Title>
          <S.FilterField>
            <div onClick={handleAll}>
              <FilterTag name="Vsa" active={allActive} />
            </div>
            <div onClick={handleDone}>
              <FilterTag name="Končana" active={doneActive} />
            </div>
            <div onClick={handleNotDone}>
              <FilterTag name="Nedokončana" active={notDoneActive} />
            </div>
            <S.FilterIcon src={Filter} />
          </S.FilterField>
        </S.TitleAndFilter>
        {taskList && taskList.length > 0 ? (
          listOfLists[listToDisplay].map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              naziv={task.naziv}
              kategorija={task.kategorija}
              opis={task.opis}
              rok={task.rok}
              opravljeno={task.opravljeno}
            />
          ))
        ) : (
          <p>Nobeno opravilo ni na voljo</p>
        )}

        <AddTask></AddTask>
      </S.Main>
      {showDelete && <DeleteModal />}
      {showAdd && <AddModal />}
      {showAddCategory && <AddCategoryModal id={undefined} />}
    </S.Page>
  );
};

export default Home;
