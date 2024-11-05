import React, { useContext, useState } from "react";

import { useParams } from "react-router-dom";

import * as S from "./styles";
import Logo from "../../Img/Logo.png";
import TaskFill from "../../Img/task.png";
import Settings from "../../Img/settings.svg";
import Folder from "../../Img/folder.svg";
import Logout from "../../Img/logout.svg";
import SidebarItem from "../../Components/SidebarItem";
import ExpandSidebarItem from "../../Components/ExpandSidebarItem";
import TaskCard from "../../Components/TaskCard";
import AddTask from "../../Components/AddTask";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskListType } from "../../Contexts/taskType";
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
import { CategoryContextType } from "../../Contexts/categoriesType";
import { CategoriesContext } from "../../Contexts/categoriesContext";

const CategoriePage: React.FC = () => {
  const { name } = useParams<string>();

  const { taskList, doneTasks, notDoneTasks } = useContext(
    TaskListContext
  ) as TaskListType;
  const { showDelete } = useContext(DeleteContext) as DeleteType;
  const { categList } = useContext(CategoriesContext) as CategoryContextType;
  const { showAdd } = useContext(AddContext) as AddType;
  const [listToDisplay, setListToDisplay] = useState(0);
  const id = categList.find((cat) => cat.naziv == name)?.id;
  const listOfLists = [
    taskList.filter((task) => task.kategorija == id),
    doneTasks.filter((task) => task.kategorija == id),
    notDoneTasks.filter((task) => task.kategorija == id),
  ];
  const [allActive, setAllActive] = useState(true);
  const [doneActive, setDoneActive] = useState(false);
  const [notDoneActive, setNotDoneActive] = useState(false);

  const { setUserData } = useContext(AuthContext) as AuthType;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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
    setUserData({ email: "" });
  }
  return (
    <S.Page>
      <S.Sidebar>
        <S.Img src={Logo} />
        <S.Tabs>
          <Link to="/" style={{ textDecoration: "none" }}>
            <SidebarItem
              icon={TaskFill}
              name="Opravila"
              isActive={false}
            ></SidebarItem>
          </Link>
          <ExpandSidebarItem
            icon={Folder}
            name="Kategorije"
          ></ExpandSidebarItem>
          <SidebarItem
            icon={Settings}
            name="Nastavitve"
            isActive={false}
          ></SidebarItem>
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
        <S.Header>{name}</S.Header>
        <S.TitleAndFilter>
          <S.Title onClick={handleDone}>Opravila </S.Title>
          <S.FilterField>
            <div onClick={handleAll}>
              <FilterTag name="Vsa" active={allActive} />
            </div>
            <div onClick={handleDone}>
              <FilterTag name="Dokončana" active={doneActive} />
            </div>
            <div onClick={handleNotDone}>
              <FilterTag name="Nedokončana" active={notDoneActive} />
            </div>
            <S.FilterIcon src={Filter} />
          </S.FilterField>
        </S.TitleAndFilter>
        {listOfLists[listToDisplay].map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            naziv={task.naziv}
            opis={task.opis}
            kategorija={task.kategorija}
            rok={task.rok}
            opravljeno={task.opravljeno}
          />
        ))}
        <AddTask></AddTask>
      </S.Main>
      {showDelete && <DeleteModal />}
      {showAdd && <AddModal />}
    </S.Page>
  );
};

export default CategoriePage;
