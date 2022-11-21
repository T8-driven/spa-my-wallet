import { Button, Input, SingContainer, Title } from "./Signup";
import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../services/auth";
import swal from "sweetalert";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

export default function Signin() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const { setJwt } = useContext(AuthContext);

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSendForm(e) {
    e.preventDefault();
    signin(form).then((res) => {
      if (res.data.message) {
        return swal({
          title: "Error",
          text: res.data.message,
          icon: "error",
          timer: "7000",
        });
      }
      setJwt(res.data.token);
      navigate("/");
    });
  }
  return (
    <SingContainer>
      <Form autoComplete="off">
        <Title>MyWallet</Title>

        <Input
          placeholder="Digite seu e-mail"
          name="email"
          type="email"
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        ></Input>
        <Input
          placeholder="Digite sua senha"
          name="password"
          type="password"
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        ></Input>

        <Button onClick={handleSendForm}>Entrar</Button>

        <span>
          Não tem uma conta?{" "}
          <Link className="link" to="/signup">
            Cadastre-se
          </Link>
        </span>
      </Form>
    </SingContainer>
  );
}

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  width: 400px;
  height: 300px;
  padding: 1rem;

  span {
    margin-top: 1rem;

    .link {
      color: #fff;
      font-weight: 600;
    }
  }
`;
