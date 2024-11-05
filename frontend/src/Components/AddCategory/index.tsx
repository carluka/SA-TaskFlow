import React, { useContext } from "react";
import * as S from "./styles";
import Add from "../../Img/add.svg";
import { AddType } from "../../Contexts/addType";
import { AddContext } from "../../Contexts/addContext";
import { AddCategoryType } from "../../Contexts/addCategoryType";
import { AddCategoryContext } from "../../Contexts/addCategoryContext";

const AddCategory: React.FC = () => {
  const { setShowAddCategory } = useContext(
    AddCategoryContext
  ) as AddCategoryType;

  function handleClick() {
    setShowAddCategory(true);
  }

  return (
    <S.Container onClick={handleClick}>
      <S.Icon src={Add} />
      <S.Text>Dodaj kategorijo</S.Text>
    </S.Container>
  );
};

export default AddCategory;
