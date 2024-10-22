import React, { useContext, useState } from "react";
import * as S from "./styles";
import { AddContext } from "../../Contexts/addContext";
import { AddType } from "../../Contexts/addType";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskProps, TaskListType } from "../../Contexts/taskType";
import { CategoriesContext } from "../../Contexts/categoriesContext";
import { CategorieContextType } from "../../Contexts/categoriesType";
import { ActionMeta, InputActionMeta } from "react-select";
import Select from "react-select/dist/declarations/src/Select";

const AddModal: React.FC = () => {
  const { addTask } = useContext(TaskListContext) as TaskListType;
  const { categList } = useContext(CategoriesContext) as CategorieContextType;
  const { setShowAdd } = useContext(AddContext) as AddType;

  const [taskName, setTaskName] = useState("");
  const [taskCat, setTaskCat] = useState(
    categList.findIndex((cat) => cat.name == "None")
  );

  function handleTyping(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskName(event.target.value);
  }

  function handleCancel() {
    setShowAdd(false);
  }

  function handleAdd() {
    const newTask: TaskProps = {
      id: Math.random(),
      title: taskName,
      categorie: categList[taskCat].name,
      color: categList[taskCat].color,
      done: false,
    };

    setShowAdd(false);

    addTask(newTask);
  }

  var e = document.getElementById("select") as HTMLSelectElement;

  function handleChange() {
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
        <S.Text>Izberite kategorijo</S.Text>
        <S.Select id="select" onChange={handleChange}>
          {categList.map((cat) => (
            <option value={cat.id}>{cat.name}</option>
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
