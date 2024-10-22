import React, { useContext } from "react";
import * as S from "./styles";
import Add from "../../Img/add.svg";
import { AddType } from "../../Contexts/addType";
import { AddContext } from "../../Contexts/addContext";

const AddTask: React.FC = () => {
  const { setShowAdd } = useContext(AddContext) as AddType;

  function handleClick() {
    setShowAdd(true);
  }

  return (
    <S.Container onClick={handleClick}>
      <S.Icon src={Add} />
      <S.Text>Dodaj opravilo</S.Text>
    </S.Container>
  );
};

export default AddTask;
