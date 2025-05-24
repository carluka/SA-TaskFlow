import React, { useState, useContext } from "react";
import * as S from "./styles";
import Logo from "../../Img/Logo.png";
import { Link, redirect } from "react-router-dom";
import AuthContext, { AuthType } from "../../Contexts/authContext";
import axios from "axios";

const Login: React.FC = () => {
  const { setUserData } = useContext(AuthContext) as AuthType;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    axios
      .post("http://74.234.179.253:8000/api.php?action=login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "success") {
          localStorage.setItem("@Project:email", email);
          setUserData({ email });
          redirect("/");
        } else {
          setError(response.data.message);
        }
      })
      .catch(function (error) {
        console.error("There was an error!", error);
      });
  }

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <S.Page>
      <S.LeftSide>
        <S.Img src={Logo}></S.Img>
      </S.LeftSide>
      <S.RightSide>
        <S.Title>Dobrodošli na TaskFlow</S.Title>
        <S.FieldName>Email</S.FieldName>
        <S.InputField
          value={email}
          id="email"
          onChange={handleEmail}
          placeholder="npr. janez.novak@gmail.com"
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        ></S.InputField>
        <S.FieldName>Geslo</S.FieldName>
        <S.InputField
          value={password}
          placeholder="Vnesite geslo"
          type="password"
          onChange={handlePassword}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        ></S.InputField>
        <S.ErrorMessage>{error}</S.ErrorMessage>
        <S.SignIn onClick={handleLogin}>Prijava</S.SignIn>
        <S.Subtitle>
          Še nimate računa? <Link to="/register">Registracija</Link>
        </S.Subtitle>
      </S.RightSide>
    </S.Page>
  );
};

export default Login;
