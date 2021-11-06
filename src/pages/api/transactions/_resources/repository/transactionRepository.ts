import { TransactionModelProps, TransactionReqProps } from "../../../../../hooks/useTransactions/transactions.type"
import { UUID } from "../../../../../utils/generateID"

let transactions: TransactionReqProps[] = [
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

function list(): TransactionReqProps[] {
  return transactions
}

function get(idTransaction: string): TransactionReqProps | undefined {
  const transaction = transactions.find(({ id }) => id === idTransaction)
  return transaction
}

function post(transaction: TransactionModelProps): TransactionReqProps | undefined {
  const newTransaction: TransactionReqProps = {
    ...transaction,
    id: UUID(),
  }

  transactions.push(newTransaction)

  return newTransaction
}

function put(
  idTransaction: string,
  transaction: Partial<TransactionReqProps>
): Partial<TransactionReqProps> | undefined {
  const currentTransaction = get(idTransaction)

  if (!currentTransaction) return currentTransaction

  const editedTransaction = {
    ...currentTransaction,
    ...transaction,
  }

  transactions = transactions.map((tr) => {
    if (tr.id !== idTransaction) return tr
    else return editedTransaction
  })

  return editedTransaction
}

function patch(
  idTransaction: string,
  transaction: Partial<TransactionReqProps>
): Partial<TransactionReqProps> | undefined {
  const currentTransaction = get(idTransaction)

  if (!currentTransaction) return currentTransaction

  const editedTransaction = {
    ...currentTransaction,
    ...transaction,
  }

  transactions = transactions.map((tr) => {
    if (tr.id === idTransaction) return editedTransaction
    else return tr
  })

  return editedTransaction
}

function remove(idTransaction: string): boolean {
  const filteredTransactions = transactions.filter(({ id }) => id !== idTransaction)
  transactions = filteredTransactions
  return true
}

export const transactionRepository = {
  list,
  get,
  post,
  put,
  patch,
  remove,
}
