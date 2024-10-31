import React, { useContext, useState } from "react";
import * as S from "./styles";
import { CategoriesContext } from "../../Contexts/categoriesContext";
import {
  CategorieContextType,
  CategorieProps,
} from "../../Contexts/categoriesType";
import axios from "axios";
import AuthContext, { AuthType } from "../../Contexts/authContext";
import { AddCategorieType } from "../../Contexts/addCategorieType";
import { AddCategorieContext } from "../../Contexts/addCategorieContext";

const AddCategorieModal: React.FC = () => {
  const { userData } = useContext(AuthContext) as AuthType;
  const { setShowAddCategorie } = useContext(
    AddCategorieContext
  ) as AddCategorieType;

  const [categorieName, setCategorieName] = useState("");
  const { addCat } = useContext(CategoriesContext) as CategorieContextType;
  var e = document.getElementById("select") as HTMLSelectElement;

  function handleTyping(event: React.ChangeEvent<HTMLInputElement>) {
    setCategorieName(event.target.value);
  }

  function handleCancel() {
    setShowAddCategorie(false);
  }

  function handleAdd() {
    const newCat: CategorieProps = {
      id: Math.random(),
      naziv: categorieName,
      uporabnik: userData.email,
    };
    axios
      .post("http://localhost:8000/api.php?action=addCategory", newCat)
      .then(function (response) {
        if (response.data.status == "success") {
          const catWithId: CategorieProps = {
            ...newCat,
            id: response.data.id,
          };
          addCat(catWithId);
        }
      })
      .catch(function (error) {
        console.error("There was an error!", error);
      });
    setShowAddCategorie(false);
  }

  return (
    <S.Background>
      <S.Container>
        <S.Text>Vnesite naziv</S.Text>
        <S.TitleInput
          placeholder="Naziv kategorije"
          onChange={handleTyping}
          value={categorieName}
        />
        <S.Buttons>
          <S.CancelButton onClick={handleCancel}>Prekliči</S.CancelButton>
          <S.DeletButton onClick={handleAdd}>Dodaj</S.DeletButton>
        </S.Buttons>
      </S.Container>
    </S.Background>
  );
};

export default AddCategorieModal;
