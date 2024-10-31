import React, { useContext } from "react";
import * as S from "./styles";
import Add from "../../Img/add.svg";
import { AddType } from "../../Contexts/addType";
import { AddContext } from "../../Contexts/addContext";
import { AddCategorieType } from "../../Contexts/addCategorieType";
import { AddCategorieContext } from "../../Contexts/addCategorieContext";

const AddCategorie: React.FC = () => {
  const { setShowAddCategorie } = useContext(
    AddCategorieContext
  ) as AddCategorieType;

  function handleClick() {
    setShowAddCategorie(true);
  }

  return (
    <S.Container onClick={handleClick}>
      <S.Icon src={Add} />
      <S.Text>Dodaj kategorijo</S.Text>
    </S.Container>
  );
};

export default AddCategorie;
