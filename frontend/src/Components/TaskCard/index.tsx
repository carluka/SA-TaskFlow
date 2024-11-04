import React, { useState, useContext } from "react";
import * as S from "./styles";
import Edit from "../../Img/edit.svg";
import Erase from "../../Img/erase.svg";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskListType, TaskProps } from "../../Contexts/taskType";
import { DeleteContext } from "../../Contexts/deleteContext";
import { DeleteType } from "../../Contexts/deleteType";
import axios from "axios";
import { AddContext } from "../../Contexts/addContext";
import { AddType } from "../../Contexts/addType";

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
  const { setShowAdd } = useContext(AddContext) as AddType;
  const { setTask } = useContext(AddContext) as AddType;

  const formattedDate =
    rok === "0000-00-00 00:00:00" ? null : new Date(rok).toLocaleDateString();

  function handleCheck() {
    axios.put("http://localhost:8000/api.php?action=checkTask", id);
    checkTask(id);
  }

  function handleDelete() {
    setShowDelete(true);
    setId(id);
  }

  function handleEdit() {
    const task: TaskProps = {
      id: id,
      naziv: naziv,
      opis: opis,
      rok: rok,
      kategorija: kategorija,
      opravljeno: opravljeno,
      uporabnik: "",
    };
    setShowAdd(true);
    setTask(task);
  }

  return (
    <S.Container opravljeno={opravljeno}>
      <S.CheckField>
        <S.CheckboxRing onClick={handleCheck}>
          <S.CheckFill opravljeno={opravljeno} />
        </S.CheckboxRing>
      </S.CheckField>
      <S.Description>
        <div style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <S.Name opravljeno={opravljeno}>{naziv}</S.Name>
          <S.ListBelong>
            <S.ListName title={opis}>{opis}</S.ListName>
          </S.ListBelong>
        </div>
        <S.Deadline>{formattedDate}</S.Deadline>
      </S.Description>

      <S.Icon src={Edit} onClick={handleEdit} />
      <S.Icon src={Erase} onClick={handleDelete} />
    </S.Container>
  );
};

export default TaskCard;
