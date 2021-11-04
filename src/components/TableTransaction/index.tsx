import { Table, Thead, Tbody, Tfoot, Tr, Th } from "@chakra-ui/react"
import { TableTransactionRow } from "./TableTransactionRow"
import { TableTransactionTh } from "./TableTransactionTh"
import { TransactionProps } from "../../hooks/useTransactions"
import { formatCurrency } from "../../utils/maskUtil"

interface TableTransactionProps {
  data: TransactionProps[]
}

export function TableTransaction({ data }: TableTransactionProps) {
  return (
    <Table variant="simple" bg="gray.700" borderRadius="xl">
      <Thead>
        <Tr>
          <TableTransactionTh>Título</TableTransactionTh>
          <TableTransactionTh>Preço</TableTransactionTh>
          <TableTransactionTh>Data</TableTransactionTh>
        </Tr>
      </Thead>

      <Tbody>
        {data.map((transaction) => (
          <TableTransactionRow
            key={transaction.id}
            title={transaction.title}
            amount={formatCurrency(transaction.amount)}
            date={transaction.dateDisplay}
            type={transaction.type}
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
