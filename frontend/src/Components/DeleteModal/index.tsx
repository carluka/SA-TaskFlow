import React from "react";
import * as S from "./styles";
import { DeleteType } from "../../Contexts/deleteType";
import { DeleteContext } from "../../Contexts/deleteContext";
import { useContext } from "react";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskListType } from "../../Contexts/taskType";
import axios from "axios";

const DeleteModal: React.FC = () => {
  const { setShowDelete, id, setId } = useContext(DeleteContext) as DeleteType;
  const { deleteTask } = useContext(TaskListContext) as TaskListType;

  function handleCancel() {
    setShowDelete(false);
  }

  function handleConfirm() {
    axios
      .delete("http://74.234.179.253:8000/api.php?action=deleteTask", {
        data: { id: id },
      })
      //.then(function (response) {})
      .catch(function (error) {
        console.error("There was an error!", error);
      });
    deleteTask(id);
    setId(0);
    setShowDelete(false);
  }

  return (
    <S.Background>
      <S.Container>
        <S.Text>Ali ste prepričani, da želite izbrisati to opravilo?</S.Text>
        <S.Buttons>
          <S.CancelButton onClick={handleCancel}>Prekliči</S.CancelButton>
          <S.DeletButton onClick={handleConfirm}>Izbriši</S.DeletButton>
        </S.Buttons>
      </S.Container>
    </S.Background>
  );
};

export default DeleteModal;
