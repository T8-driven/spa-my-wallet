import axios from "axios";

const BASE_URL = "http://localhost:5000";

export function createTransaction(body, type, jwt) {
  const transaction = {
    ...body,
    type,
  };

  const response = axios
    .post(`${BASE_URL}/transactions`, transaction, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .catch((err) => {
      return err.response;
    });
  return response;
}

export function findAllTransactions(jwt) {
  const response = axios
    .get(`${BASE_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .catch((err) => {
      return err.response;
    });

  return response;
}
