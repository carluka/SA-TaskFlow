import React, { useState, useContext } from "react";
import * as S from "./styles";
import Arrow from "../../Img/arrow.svg";
import CategoryItem from "../Category";
import Add from "../../Img/add.svg";
import { CategoriesContext } from "../../Contexts/categoriesContext";
import { CategoryContextType } from "../../Contexts/categoriesType";
import AddCategory from "../AddCategory";

interface SidebarItemProps {
  name: string;
  icon: string;
}

const ExpandSidebarItem: React.FC<SidebarItemProps> = ({ name, icon }) => {
  const [active, setActive] = useState(false);
  const { categList } = useContext(CategoriesContext) as CategoryContextType;

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
          <CategoryItem key={cat.id} name={cat.naziv} />
        ))}
        <AddCategory></AddCategory>
      </S.CatArea>
    </S.OuterContainer>
  );
};

export default ExpandSidebarItem;
