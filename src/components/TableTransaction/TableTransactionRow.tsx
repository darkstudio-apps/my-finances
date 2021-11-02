import { Tr, Td } from "@chakra-ui/react"
import { TransactionTypeProps } from "../../hooks/useTransactions/transactions.type"

interface TableTransactionRowProps {
  title: string
  amount: string
  category: string
  date: string
  type: TransactionTypeProps
}

export function TableTransactionRow({
  title,
  amount,
  category,
  date,
  type,
}: TableTransactionRowProps) {
  const isIncome = type === "deposit"

  return (
    <Tr _hover={{ bg: "gray.600" }} cursor="pointer">
      <Td borderColor="gray.600">{title}</Td>
      <Td borderColor="gray.600" color={isIncome ? "green.400" : "red.400"}>
        {amount}
      </Td>
      <Td borderColor="gray.600">{category}</Td>
      <Td borderColor="gray.600">{date}</Td>
    </Tr>
  )
}
