const transactions = [
  {
    id: "63453252532",
    title: "Desenvolvimento de site",
    amount: 4000,
    date: "2021-11-03T16:21:40.451Z",
    type: "deposit",
    category: "Venda",
  },
  {
    id: "45353252532",
    title: "Desenvolvimento de app",
    amount: 3000,
    date: "2021-11-05T16:21:40.451Z",
    type: "deposit",
    category: "Venda",
  },
]

function list() {
  return transactions
}

function get(idTransaction: string) {
  return transactions.find(({ id }) => id === idTransaction)
}

function post() {

}

function put() {

}

function patch() {

}

function remove() {

}

export const transactionRepository = {
  list,
  get,
  post,
  put,
  patch,
  remove,
}
