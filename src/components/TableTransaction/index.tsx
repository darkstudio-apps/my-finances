import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  color,
} from "@chakra-ui/react"

interface TableTransactionProps {
  title: string
  price: string
  category: string
  date: string
  isIncome: boolean
}

export function TableTransaction({
  title,
  price,
  category,
  date,
  isIncome,
}: TableTransactionProps) {
  return (
    <Tr>
      <Td>{title}</Td>
      <Td color={isIncome ? "green.500" : "red.500"}>{price}</Td>
      <Td>{category}</Td>
      <Td>{date}</Td>
    </Tr>
  )
}
