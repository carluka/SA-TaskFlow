import React, { useState, useContext } from "react";
import * as S from "./styles";
import Arrow from "../../Img/arrow.svg";
import CategorieItem from "../Categorie";
import Add from "../../Img/add.svg";
import { CategoriesContext } from "../../Contexts/categoriesContext";
import { CategorieContextType } from "../../Contexts/categoriesType";
import AddCategorie from "../AddCategorie";

interface SidebarItemProps {
  name: string;
  icon: string;
}

const ExpandSidebarItem: React.FC<SidebarItemProps> = ({ name, icon }) => {
  const [active, setActive] = useState(false);
  const { categList } = useContext(CategoriesContext) as CategorieContextType;

  function handleActivate() {
    setActive(!active);
  }

  return (
    <S.OuterContainer isActive={active}>
      <S.Container isActive={active} onClick={handleActivate}>
        <S.Icon src={icon} />
        <S.Name>{name}</S.Name>
        <S.Arrow isActive={active} src={Arrow} />
      </S.Container>
      <S.CatArea isActive={active}>
        {categList.map((cat) => (
          <CategorieItem key={cat.id} name={cat.naziv} />
        ))}
        <AddCategorie></AddCategorie>
      </S.CatArea>
    </S.OuterContainer>
  );
};

export default ExpandSidebarItem;
