import React, { useContext, useEffect, useState } from "react";
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
  const { addTask, editTask } = useContext(TaskListContext) as TaskListType;
  const { categList } = useContext(CategoriesContext) as CategorieContextType;
  const { setShowAdd } = useContext(AddContext) as AddType;
  const { userData } = useContext(AuthContext) as AuthType;
  const { task, setTask } = useContext(AddContext) as AddType;

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("0000-00-00 00:00:00");
  const [taskUser, setTaskUser] = useState(userData.email);
  const [taskDone, setTaskDone] = useState(false);
  const [taskCat, setTaskCat] = useState<number>(-1);

  useEffect(() => {
    if (task) {
      setTaskName(task.naziv);
      setTaskDescription(task.opis);
      setTaskDeadline(task.rok.split(" ")[0]);
      setTaskUser(task.uporabnik || userData.email);
      setTaskDone(task.opravljeno);
      setTaskCat(task.kategorija ?? -1);
    } else {
      resetForm();
    }
  }, [task, userData.email, categList]);

  const resetForm = () => {
    setTaskName("");
    setTaskDescription("");
    setTaskDeadline("0000-00-00 00:00:00");
    setTaskUser(userData.email);
    setTaskDone(false);
    setTaskCat(-1);
  };

  const handleFormChange =
    (
      setter: React.Dispatch<React.SetStateAction<any>>,
      isNumber: boolean = false
    ) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = isNumber
        ? parseInt(event.target.value)
        : event.target.value;
      setter(value);
    };

  const handleSubmit = async () => {
    const newTask: TaskProps = {
      id: task ? task.id : Math.random(),
      naziv: taskName,
      opis: taskDescription,
      rok: taskDeadline,
      kategorija: taskCat,
      opravljeno: taskDone,
      uporabnik: taskUser,
    };
    console.log(taskDeadline);

    try {
      if (task) {
        await axios.put(
          "http://localhost:8000/api.php?action=editTask",
          newTask
        );
        editTask(newTask);
      } else {
        const response = await axios.post(
          "http://localhost:8000/api.php?action=addTask",
          newTask
        );
        if (response.data.status === "success") {
          addTask({ ...newTask, id: response.data.id });
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setShowAdd(false);
      setTask(null);
      resetForm();
    }
  };

  return (
    <S.Background>
      <S.Container>
        <S.Text>Vnesite naziv</S.Text>
        <S.TitleInput
          placeholder="Naziv opravila"
          onChange={handleFormChange(setTaskName)}
          value={taskName}
        />

        <S.Text>Opis opravila</S.Text>
        <S.TitleInput
          placeholder="Opis opravila"
          onChange={handleFormChange(setTaskDescription)}
          value={taskDescription}
        />

        <S.Text>Rok</S.Text>
        <S.TitleInput
          type="date"
          onChange={handleFormChange(setTaskDeadline)}
          value={taskDeadline}
        />

        <S.Text>Izberite kategorijo</S.Text>
        <S.Select onChange={handleFormChange(setTaskCat, true)} value={taskCat}>
          {categList.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.naziv}
            </option>
          ))}
        </S.Select>

        <S.Buttons>
          <S.CancelButton
            onClick={() => {
              setShowAdd(false);
              setTask(null);
            }}
          >
            Prekliči
          </S.CancelButton>
          <S.DeletButton onClick={handleSubmit}>
            {task ? "Posodobi" : "Dodaj"}
          </S.DeletButton>
        </S.Buttons>
      </S.Container>
    </S.Background>
  );
};

export default AddModal;
