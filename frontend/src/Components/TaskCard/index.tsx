import React, { useState, useContext } from "react";
import * as S from "./styles";
import Edit from "../../Img/edit.svg";
import Erase from "../../Img/erase.svg";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskListType } from "../../Contexts/taskType";
import { DeleteContext } from "../../Contexts/deleteContext";
import { DeleteType } from "../../Contexts/deleteType";

interface TaskCardProps {
  id: number;
  naziv: string;
  opis: string;
  kategorija: string;
  rok: string;
  opravljeno: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  naziv,
  kategorija,
  opravljeno,
  rok,
  opis,
}) => {
  const { setShowDelete, setId } = useContext(DeleteContext) as DeleteType;
  const { checkTask } = useContext(TaskListContext) as TaskListType;

  // Assuming category and user mappings
  const categories = ["Low Priority", "Medium Priority", "High Priority"]; // Example categories
  //const formattedCategory = categories[kategorija] || "Unknown Category";

  const formattedDate =
    rok === "0000-00-00 00:00:00"
      ? "No deadline"
      : new Date(rok).toLocaleString();

  function handleCheck() {
    checkTask(id);
  }

  function handleDelete() {
    setShowDelete(true);
    setId(id);
  }

  return (
    <S.Container>
      <S.CheckField>
        <S.CheckboxRing onClick={handleCheck}>
          <S.CheckFill done={opravljeno} />
        </S.CheckboxRing>
      </S.CheckField>
      <S.Description>
        <S.Name done={opravljeno}>{naziv}</S.Name>
        <S.ListBelong>
          <S.ColorTag color={kategorija} />
          <S.ListName>{opis}</S.ListName>
        </S.ListBelong>
        <S.Deadline>Due: {formattedDate}</S.Deadline>
      </S.Description>

      <S.Icon src={Edit} />
      <S.Icon src={Erase} onClick={handleDelete} />
    </S.Container>
  );
};

export default TaskCard;
