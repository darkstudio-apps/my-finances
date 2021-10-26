import { Table, Thead, Tbody, Tfoot, Tr, Th } from "@chakra-ui/react"
import { TableTransactionRow } from "./TableTransactionRow"
import { TableTransactionTh } from "./TableTransactionTh"

interface TransactionsProps {
  id: number
  title: string
  price: string
  category: string
  date: string
  isIncome: boolean
}

interface TableTransactionProps {
  data: TransactionsProps[]
}

export function TableTransaction({ data }: TableTransactionProps) {
  return (
    <Table variant="simple" bg="gray.700" borderRadius="xl">
      <Thead>
        <Tr>
          <TableTransactionTh>Título</TableTransactionTh>
          <TableTransactionTh>Preço</TableTransactionTh>
          <TableTransactionTh>Categoria</TableTransactionTh>
          <TableTransactionTh>Data</TableTransactionTh>
        </Tr>
      </Thead>

      <Tbody>
        {data.map((transaction) => (
          <TableTransactionRow
            key={transaction.id}
            title={transaction.title}
            price={transaction.price}
            category={transaction.category}
            date={transaction.date}
            isIncome={transaction.isIncome}
          />
        ))}
      </Tbody>

      <Tfoot>
        <Tr>
          <Th></Th>
        </Tr>
      </Tfoot>
    </Table>
  )
}
