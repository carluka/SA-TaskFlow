import React, { useContext, useState } from "react";
import * as S from "./styles";
import { CategoriesContext } from "../../Contexts/categoriesContext";
import {
  CategoryContextType,
  CategoryProps,
} from "../../Contexts/categoriesType";
import axios from "axios";
import AuthContext, { AuthType } from "../../Contexts/authContext";
import { AddCategoryType } from "../../Contexts/addCategoryType";
import { AddCategoryContext } from "../../Contexts/addCategoryContext";

const AddCategoryModal: React.FC = () => {
  const { userData } = useContext(AuthContext) as AuthType;
  const { setShowAddCategory } = useContext(
    AddCategoryContext
  ) as AddCategoryType;

  const [categoryName, setCategoryName] = useState("");
  const { addCat } = useContext(CategoriesContext) as CategoryContextType;
  var e = document.getElementById("select") as HTMLSelectElement;

  function handleTyping(event: React.ChangeEvent<HTMLInputElement>) {
    setCategoryName(event.target.value);
  }

  function handleCancel() {
    setShowAddCategory(false);
  }

  function handleAdd() {
    const newCat: CategoryProps = {
      id: Math.random(),
      naziv: categoryName,
      uporabnik: userData.email,
    };
    axios
      .post("http://localhost:8000/api.php?action=addCategory", newCat)
      .then(function (response) {
        if (response.data.status == "success") {
          const catWithId: CategoryProps = {
            ...newCat,
            id: response.data.id,
          };
          addCat(catWithId);
        }
      })
      .catch(function (error) {
        console.error("There was an error!", error);
      });
    setShowAddCategory(false);
  }

  return (
    <S.Background>
      <S.Container>
        <S.Text>Vnesite naziv</S.Text>
        <S.TitleInput
          placeholder="Naziv kategorije"
          onChange={handleTyping}
          value={categoryName}
        />
        <S.Buttons>
          <S.CancelButton onClick={handleCancel}>Prekliči</S.CancelButton>
          <S.DeletButton onClick={handleAdd}>Dodaj</S.DeletButton>
        </S.Buttons>
      </S.Container>
    </S.Background>
  );
};

export default AddCategoryModal;
