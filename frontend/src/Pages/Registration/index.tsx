import React, { useState, useContext } from "react";
import * as S from "./styles";
import Logo from "../../Img/Logo.png";
import { Link } from "react-router-dom";
import AuthContext, { AuthType } from "../../Contexts/authContext";
import axios from "axios";

const Register: React.FC = () => {
  const { setUserData } = useContext(AuthContext) as AuthType;
  const [ime, setIme] = useState("");
  const [priimek, setPriimek] = useState("");
  const [email, setEmail] = useState("");
  const [geslo, setGeslo] = useState("");

  function handleIme(event: React.ChangeEvent<HTMLInputElement>) {
    setIme(event.target.value);
  }

  function handlePriimek(event: React.ChangeEvent<HTMLInputElement>) {
    setPriimek(event.target.value);
  }

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleGeslo(event: React.ChangeEvent<HTMLInputElement>) {
    setGeslo(event.target.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    axios
      .post(
        "http://localhost:8000/api.php?action=register",
        {
          ime: ime,
          priimek: priimek,
          email: email,
          geslo: geslo,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("There was an error registering the user!", error);
      });
  }

  return (
    <S.Page>
      <S.LeftSide>
        <S.Img src={Logo}></S.Img>
      </S.LeftSide>
      <S.RightSide>
        <S.Title>Registracija</S.Title>

        <S.FieldName>Ime</S.FieldName>
        <S.InputField
          value={ime}
          id="ime"
          onChange={handleIme}
          placeholder="npr. Janez"
        ></S.InputField>

        <S.FieldName>Priimek</S.FieldName>
        <S.InputField
          value={priimek}
          id="priimek"
          onChange={handlePriimek}
          placeholder="npr. Novak"
        ></S.InputField>

        <S.FieldName>Email</S.FieldName>
        <S.InputField
          value={email}
          id="email"
          onChange={handleEmail}
          placeholder="npr. janez.novak@gmail.com"
        ></S.InputField>

        <S.FieldName>Geslo</S.FieldName>
        <S.InputField
          value={geslo}
          placeholder="Vnesite geslo"
          type="password"
          onChange={handleGeslo}
        ></S.InputField>

        {/*<S.KeepSigned>
          <S.Checkbox />
          <S.Subtitle>Remember me</S.Subtitle>
        </S.KeepSigned>*/}

        <S.SignIn onClick={handleSubmit}>Registracija</S.SignIn>
        <S.Subtitle>
          Že imate račun? <Link to="/login">Prijava</Link>
        </S.Subtitle>
      </S.RightSide>
    </S.Page>
  );
};

export default Register;
