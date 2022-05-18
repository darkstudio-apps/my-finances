import { useContext } from "react"
import { TransactionsContext } from "./TransactionsContext"

export const useTransactions = () => {
  return useContext(TransactionsContext)
}
