import React, { useState, useContext } from "react";
import * as S from "./styles";
import Logo from "../../Img/Logo.png";
import { Link, redirect } from "react-router-dom";
import AuthContext, { AuthType } from "../../Contexts/authContext";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Register: React.FC = () => {
  const { setUserData } = useContext(AuthContext) as AuthType;
  const [ime, setIme] = useState("");
  const [priimek, setPriimek] = useState("");
  const [email, setEmail] = useState("");
  const [geslo, setGeslo] = useState("");

  const [imeError, setImeError] = useState<string | null>(null);
  const [priimekError, setPriimekError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const [isLongEnough, setIsLongEnough] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function handleIme(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setIme(value);
    setImeError(value ? null : "Ime ne sme biti prazno.");
  }

  function handlePriimek(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setPriimek(value);
    setPriimekError(value ? null : "Priimek ne sme biti prazen.");
  }

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setEmail(value);
    setEmailError(emailRegex.test(value) ? null : "Napačen format e-pošte.");
  }

  function handleGeslo(event: React.ChangeEvent<HTMLInputElement>) {
    const newPassword = event.target.value;
    setGeslo(newPassword);

    const isLongEnough = newPassword.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    setIsLongEnough(isLongEnough);
    setHasUppercase(hasUppercase);
    setHasLowercase(hasLowercase);
    setHasNumber(hasNumber);
    setHasSpecialChar(hasSpecialChar);

    if (
      isLongEnough &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    ) {
      setPasswordError(null);
    } else {
      setPasswordError("Geslo ne izpolnjuje vseh zahtev.");
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!ime) setImeError("Ime ne sme biti prazno.");
    if (!priimek) setPriimekError("Priimek ne sme biti prazen.");
    if (!emailRegex.test(email)) setEmailError("Napačen format e-pošte.");
    if (
      !isLongEnough ||
      !hasUppercase ||
      !hasLowercase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      setPasswordError("Geslo ne izpolnjuje vseh zahtev.");
      return;
    }

    if (!imeError && !priimekError && !emailError && !passwordError) {
      axios
        .post(
          "http://74.234.179.253:8000/api.php?action=register",
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
          console.log(response);
          if (response.data.status === "success") {
            localStorage.setItem("@Project:email", email);
            setUserData({ email });
            console.log("redirect");
            redirect("/");
          } else {
            setServerError(response.data.message);
          }
        })
        .catch((error) => {
          console.error("There was an error registering the user!", error);
        });
    }
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
        {imeError && <S.ErrorMessage>{imeError}</S.ErrorMessage>}

        <S.FieldName>Priimek</S.FieldName>
        <S.InputField
          value={priimek}
          id="priimek"
          onChange={handlePriimek}
          placeholder="npr. Novak"
        ></S.InputField>
        {priimekError && <S.ErrorMessage>{priimekError}</S.ErrorMessage>}

        <S.FieldName>Email</S.FieldName>
        <S.InputField
          value={email}
          id="email"
          onChange={handleEmail}
          placeholder="npr. janez.novak@gmail.com"
        ></S.InputField>
        {emailError && <S.ErrorMessage>{emailError}</S.ErrorMessage>}

        <S.FieldName>Geslo</S.FieldName>
        <S.InputField
          value={geslo}
          placeholder="Vnesite geslo"
          type="password"
          onChange={handleGeslo}
        ></S.InputField>
        {passwordError && <S.ErrorMessage>{passwordError}</S.ErrorMessage>}

        <S.Checklist>
          <S.CheckItem>
            {isLongEnough ? (
              <FaCheckCircle color="green" />
            ) : (
              <FaTimesCircle color="red" />
            )}{" "}
            8 znakov
          </S.CheckItem>
          <S.CheckItem>
            {hasUppercase ? (
              <FaCheckCircle color="green" />
            ) : (
              <FaTimesCircle color="red" />
            )}{" "}
            Ena velika črka
          </S.CheckItem>
          <S.CheckItem>
            {hasLowercase ? (
              <FaCheckCircle color="green" />
            ) : (
              <FaTimesCircle color="red" />
            )}{" "}
            Ena mala črka
          </S.CheckItem>
          <S.CheckItem>
            {hasNumber ? (
              <FaCheckCircle color="green" />
            ) : (
              <FaTimesCircle color="red" />
            )}{" "}
            Ena številka
          </S.CheckItem>
          <S.CheckItem>
            {hasSpecialChar ? (
              <FaCheckCircle color="green" />
            ) : (
              <FaTimesCircle color="red" />
            )}{" "}
            En poseben znak
          </S.CheckItem>
        </S.Checklist>
        {serverError && (
          <S.SpecialErrorMessage>{serverError}</S.SpecialErrorMessage>
        )}

        <S.SignIn onClick={handleSubmit}>Registracija</S.SignIn>
        <S.Subtitle>
          Že imate račun? <Link to="/login">Prijava</Link>
        </S.Subtitle>
      </S.RightSide>
    </S.Page>
  );
};

export default Register;
