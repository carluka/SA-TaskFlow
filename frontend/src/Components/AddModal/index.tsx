import React, { useContext, useState } from "react";
import * as S from "./styles";
import { AddContext } from "../../Contexts/addContext";
import { AddType } from "../../Contexts/addType";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskProps, TaskListType } from "../../Contexts/taskType";
import { CategoriesContext } from "../../Contexts/categoriesContext";
import { CategorieContextType } from "../../Contexts/categoriesType";
import axios from "axios";
import AuthContext, { AuthType } from "../../Contexts/authContext";

const AddModal: React.FC = () => {
  const { addTask } = useContext(TaskListContext) as TaskListType;
  const { categList } = useContext(CategoriesContext) as CategorieContextType;
  const { setShowAdd } = useContext(AddContext) as AddType;
  const { userData } = useContext(AuthContext) as AuthType;

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskUser, setTaskUser] = useState("");
  const [taskDone, setTaskDone] = useState(false);
  const [taskCat, setTaskCat] = useState(
    categList.findIndex((cat) => cat.naziv === "None")
  );

  function handleTyping(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskName(event.target.value);
  }

  function handleDescription(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskDescription(event.target.value);
  }

  function handlePriority(event: React.ChangeEvent<HTMLSelectElement>) {
    setTaskPriority(event.target.value);
  }

  function handleDeadline(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskDeadline(event.target.value);
  }

  function handleUser(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskUser(event.target.value);
  }

  function handleDone(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskDone(event.target.checked);
  }

  function handleCancel() {
    setShowAdd(false);
  }

  function handleAdd() {
    console.log(taskCat);
    const newTask: TaskProps = {
      id: Math.random(),
      naziv: taskName,
      opis: taskDescription,
      prioriteta: taskPriority,
      rok: taskDeadline,
      kategorija: taskCat,
      opravljeno: false,
      uporabnik: userData.email,
    };
    axios
      .post("http://localhost:8000/api.php?action=addTask", newTask)
      .then(function (response) {
        if (response.data.status == "success") {
          const taskWithId: TaskProps = {
            ...newTask,
            id: response.data.id,
          };
          addTask(taskWithId);
        }
      })
      .catch(function (error) {
        console.error("There was an error!", error);
      });
    setShowAdd(false);
  }

  var e = document.getElementById("select") as HTMLSelectElement;

  function handleChange() {
    console.log(e.options[e.selectedIndex].value);
    setTaskCat(Number(e.options[e.selectedIndex].value));
  }

  return (
    <S.Background>
      <S.Container>
        <S.Text>Vnesite naziv</S.Text>
        <S.TitleInput
          placeholder="Naziv opravila"
          onChange={handleTyping}
          value={taskName}
        />

        <S.Text>Opis opravila</S.Text>
        <S.TitleInput
          placeholder="Opis opravila"
          onChange={handleDescription}
          value={taskDescription}
        />

        <S.Text>Prioriteta</S.Text>
        <S.Select onChange={handlePriority} value={taskPriority}>
          <option value={"Nizka"}>Nizka</option>
          <option value={"Srednja"}>Srednja</option>
          <option value={"Visoka"}>Visoka</option>
        </S.Select>

        <S.Text>Rok</S.Text>
        <S.TitleInput
          placeholder="Nastavi rok"
          type="date"
          onChange={handleDeadline}
          value={taskDeadline}
        />

        <S.Text>Izberite kategorijo</S.Text>
        <S.Select id="select" onChange={handleChange}>
          {categList.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.naziv}
            </option>
          ))}
        </S.Select>

        <S.Buttons>
          <S.CancelButton onClick={handleCancel}>Prekliči</S.CancelButton>
          <S.DeletButton onClick={handleAdd}>Dodaj</S.DeletButton>
        </S.Buttons>
      </S.Container>
    </S.Background>
  );
};

export default AddModal;
