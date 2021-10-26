import { Tr, Td } from "@chakra-ui/react"

interface TableTransactionRowProps {
  title: string
  price: string
  category: string
  date: string
  isIncome: boolean
}

export function TableTransactionRow({
  title,
  price,
  category,
  date,
  isIncome,
}: TableTransactionRowProps) {
  return (
    <Tr>
      <Td borderColor="gray.600">{title}</Td>
      <Td borderColor="gray.600" color={isIncome ? "green.400" : "red.400"}>
        {price}
      </Td>
      <Td borderColor="gray.600">{category}</Td>
      <Td borderColor="gray.600">{date}</Td>
    </Tr>
  )
}
