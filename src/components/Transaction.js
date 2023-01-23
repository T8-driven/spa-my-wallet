import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import { AuthContext } from "../Contexts/AuthContext";
import { createTransaction } from "../services/transactions";
import { Button, Input, Title, Form } from "./Signup";

export default function Transactions(props) {
  const { type } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const { jwt } = useContext(AuthContext);

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSendForm(e) {
    e.preventDefault();
    createTransaction(form, type, jwt).then((res) => {
      if (res.status === 401) {
        return swal({
          title: "Error",
          text: "Token invalido",
          icon: "error",
          timer: "7000",
        });
      }
      if (res.status === 400) {
        res.data.forEach((item) => {
          return swal({
            title: "Error",
            text: item,
            icon: "error",
            timer: "7000",
          });
        });
      }
      navigate("/");
    });
  }

  return (
    <NewTransactions>
      <Form>
        <Title>Nova {type}</Title>

        <Input
          placeholder="Valor"
          name="value"
          type="text"
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        ></Input>
        <Input
          placeholder="Descrição"
          name="description"
          type="text"
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        ></Input>

        <Button onClick={handleSendForm}>Salvar {type}</Button>
      </Form>
    </NewTransactions>
  );
}

const NewTransactions = styled.main`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
