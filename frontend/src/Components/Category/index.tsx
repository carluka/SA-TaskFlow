import React from "react";
import * as S from "./styles";
import { Link } from "react-router-dom";

interface CategoryItemProps {
  name: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name }) => {
  return (
    <Link to={"/category/" + name} style={{ textDecoration: "none" }}>
      <S.Categorie>
        <S.ListName>{name}</S.ListName>
      </S.Categorie>
    </Link>
  );
};

export default CategoryItem;
