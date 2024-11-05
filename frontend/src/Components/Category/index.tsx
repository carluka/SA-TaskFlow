import React from "react";
import * as S from "./styles";
import { Link } from "react-router-dom";
import Edit from "../../Img/edit.svg";

interface CategoryItemProps {
  name: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name }) => {
  function handleEdit() {
    console.log("ze handlam");
  }
  return (
    <Link to={"/category/" + name} style={{ textDecoration: "none" }}>
      <S.Categorie>
        <S.Icon src={Edit} onClick={handleEdit} />
        <S.ListName>{name}</S.ListName>
      </S.Categorie>
    </Link>
  );
};

export default CategoryItem;
