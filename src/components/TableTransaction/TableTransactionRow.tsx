import { Tr, Td } from "@chakra-ui/react"

interface TableTransactionRowProps {
  title: string
  price: string
  category: string
  date: string
  isIncome: boolean
}

export function TableTransactionRow(
  {
    title,
    price,
    category,
    date,
    isIncome,
  }: TableTransactionRowProps
) {
  return (
    <Tr>
      <Td>{title}</Td>
      <Td color={isIncome ? "green.500" : "red.500"}>{price}</Td>
      <Td>{category}</Td>
      <Td>{date}</Td>
    </Tr>
  )
}
