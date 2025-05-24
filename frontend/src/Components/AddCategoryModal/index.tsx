import React, { useContext, useEffect, useState } from "react";
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

interface AddCategoryProps {
  id: number | undefined;
}

const AddCategoryModal: React.FC<AddCategoryProps> = ({ id }) => {
  const { userData } = useContext(AuthContext) as AuthType;
  const { setShowAddCategory } = useContext(
    AddCategoryContext
  ) as AddCategoryType;

  const [categoryName, setCategoryName] = useState("");
  const { addCat } = useContext(CategoriesContext) as CategoryContextType;
  var e = document.getElementById("select") as HTMLSelectElement;
  const [nameError, setNameError] = useState<string | null>(null);

  const name = null;

  function handleTyping(event: React.ChangeEvent<HTMLInputElement>) {
    setCategoryName(event.target.value);
  }

  function handleCancel() {
    setShowAddCategory(false);
    setNameError(null);
  }

  function handleEdit() {
    setShowAddCategory(false);
    setNameError(null);
  }
  function handleDelete() {
    id = undefined;
    setShowAddCategory(false);
    setNameError(null);
  }

  async function handleAdd() {
    if (categoryName) {
      const newCat: CategoryProps = {
        id: id ? id : Math.random(),
        naziv: categoryName,
        uporabnik: userData.email,
      };
      try {
        if (name) {
          await axios.put(
            "http://localhost:8000/api.php?action=editCategory",
            newCat
          );
        } else {
          const response = await axios.post(
            "http://localhost:8000/api.php?action=addCategory",
            newCat
          );
          if (response.data.status === "success") {
            addCat({ ...newCat, id: response.data.id });
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setShowAddCategory(false);
        id = undefined;
        setNameError(null);
      }
    } else {
      setNameError("Naziv ne sme biti prazen.");
    }
  }

  return (
    <S.Background>
      <S.Container>
        <S.Text>Vnesite naziv</S.Text>
        <S.TitleInput
          placeholder="Naziv kategorije"
          onChange={handleTyping}
          value={categoryName}
          maxLength={22}
        />
        <S.ErrorMessage>{nameError}</S.ErrorMessage>
        {name ? (
          <S.Buttons>
            <S.CancelButton onClick={handleCancel}>Prekliči</S.CancelButton>
            <S.EditButton onClick={handleEdit}>Posodobi</S.EditButton>
            <S.DeleteButton onClick={handleDelete}>Odstrani</S.DeleteButton>
          </S.Buttons>
        ) : (
          <S.Buttons>
            <S.CancelButton onClick={handleCancel}>Prekliči</S.CancelButton>
            <S.DeleteButton onClick={handleAdd}>Dodaj</S.DeleteButton>
          </S.Buttons>
        )}
      </S.Container>
    </S.Background>
  );
};

export default AddCategoryModal;
