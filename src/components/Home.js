import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import { AuthContext } from "../Contexts/AuthContext";
import { RefreshContext } from "../Contexts/RefreshContext";
import { findAllTransactions } from "../services/transactions";

export default function Home() {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const { jwt, setJwt } = useContext(AuthContext);
  const { refresh } = useContext(RefreshContext);

  const navigate = useNavigate();

  async function getTransactions() {
    if (!jwt) {
      navigate("/signin");
    }
    const res = await findAllTransactions(jwt);
    if (res.status === 401) {
      swal({
        title: "Error",
        text: "Token inválido, faça o login novamente!",
        icon: "error",
        timer: "7000",
      });
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    }
    setUser(res.data.user);
    setTransactions(res.data.transactions);
  }

  function signOut() {
    setJwt("");
    navigate("/signin");
  }

  function newTransaction(type) {
    navigate(`transactions/${type}`);
  }

  useEffect(() => {
    getTransactions();
  }, [refresh]);

  return (
    <HomeStyled>
      <header>
        <h1>Olá, {user.name}</h1>
        <ion-icon name="log-out-outline" onClick={signOut}></ion-icon>
      </header>
      <div>
        <Transactions>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                <div>
                  <span>{transaction.createdAt.substr(0, 5)}</span>
                  <strong>{transaction.description}</strong>
                </div>

                <Value color={transaction.type}>R$ {transaction.value}</Value>
              </li>
            ))}
          </ul>
        </Transactions>
        <section>
          <Button onClick={() => newTransaction("entrada")}>
            Nova Entrada
          </Button>
          <Button onClick={() => newTransaction("saida")}>Nova Saída</Button>
        </section>
      </div>
    </HomeStyled>
  );
}

const HomeStyled = styled.main`
  background-color: #8c11be;
  margin: 1rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 1rem;
    h1 {
      font-size: 2rem;
      font-weight: 700;
    }

    ion-icon {
      font-size: 2rem;
    }
  }

  section {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

const Button = styled.button`
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
  width: 150px;
`;

const Transactions = styled.article`
  height: 500px;
  background-color: #fff;
  color: #000;
  border-radius: 0.3rem;
  padding: 1rem;

  ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ul li div span {
    color: #cccC6C6C6;
    margin-right: .7rem;
  }
`;

const Value = styled.div`
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`;
