import React, { useState, useContext } from "react";
import * as S from "./styles";
import Edit from "../../Img/edit.svg";
import Erase from "../../Img/erase.svg";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskListType } from "../../Contexts/taskType";
import { DeleteContext } from "../../Contexts/deleteContext";
import { DeleteType } from "../../Contexts/deleteType";
import axios from "axios";

interface TaskCardProps {
  id: number;
  naziv: string;
  opis: string;
  kategorija: number;
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

  const formattedDate =
    rok === "0000-00-00 00:00:00"
      ? "No deadline"
      : new Date(rok).toLocaleString();

  function handleCheck() {
    axios.put("http://localhost:8000/api.php?action=checkTask", id);
    checkTask(id);
  }

  function handleDelete() {
    setShowDelete(true);
    setId(id);
  }

  function handleEdit() {}

  return (
    <S.Container>
      <S.CheckField>
        <S.CheckboxRing onClick={handleCheck}>
          <S.CheckFill opravljeno={opravljeno} />
        </S.CheckboxRing>
      </S.CheckField>
      <S.Description>
        <S.Name opravljeno={opravljeno}>{naziv}</S.Name>
        <S.ListBelong>
          <S.ListName>{opis}</S.ListName>
        </S.ListBelong>
        <S.Deadline>Due: {formattedDate}</S.Deadline>
      </S.Description>

      <S.Icon src={Edit} onClick={handleEdit} />
      <S.Icon src={Erase} onClick={handleDelete} />
    </S.Container>
  );
};

export default TaskCard;
