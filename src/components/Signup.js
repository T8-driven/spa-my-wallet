import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signup } from "../services/auth";

export default function Signup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSendForm(e) {
    e.preventDefault();
    signup(form).then((res) => {
      navigate("/singin");
    });
  }

  return (
    <SingContainer>
      {/* <Link to="/signin">
        
      </Link> */}
      <Form autoComplete="off">
        <Title>MyWallet</Title>
        <Input
          placeholder="Digite seu nome"
          name="name"
          type="text"
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        ></Input>
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

        <Button onClick={handleSendForm}>Cadastrar</Button>
      </Form>

      <span>
        Já tem uma conta?{" "}
        <Link className="link" to="/signin">
          Entre agora!
        </Link>
      </span>
    </SingContainer>
  );
}

export const SingContainer = styled.section`
  height: 100vh;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    margin-top: 1rem;

    .link {
      color: #fff;
      font-weight: 600;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  padding-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 0.3rem;

  :focus {
    border: 2px solid #ffb6b6;
  }
`;

export const Button = styled.button`
  width: 100%;
  outline: none;
  border: none;
  border-radius: 0.3rem;
  background-color: #a328d6;
  padding: 0.5rem;
  font-size: 1rem;
  margin-top: 1rem;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
`;
