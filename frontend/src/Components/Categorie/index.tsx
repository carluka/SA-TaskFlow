import React from "react";
import * as S from "./styles";
import { Link } from "react-router-dom";

interface CategorieItemProps {
  name: string;
}

const CategorieItem: React.FC<CategorieItemProps> = ({ name }) => {
  return (
    <Link to={"/categorie/" + name} style={{ textDecoration: "none" }}>
      <S.Categorie>
        <S.ListName>{name}</S.ListName>
      </S.Categorie>
    </Link>
  );
};

export default CategorieItem;
