import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, Icon, HStack } from "@chakra-ui/react"
import { FiEdit3, FiTrash } from "react-icons/fi"

import { TableTransactionTh } from "./TableTransactionTh"
import { TransactionProps } from "../../hooks/useTransactions"

interface TableTransactionProps {
  data: TransactionProps[]
  onEdit?: (transaction: TransactionProps) => void
  onDelete?: (idTransaction: string) => void
}

export function TableTransaction({ data, onEdit, onDelete }: TableTransactionProps) {
  return (
    <Table variant="simple" bg="gray.700" borderRadius="xl">
      <Thead>
        <Tr>
          <TableTransactionTh>Título</TableTransactionTh>
          <TableTransactionTh>Valor</TableTransactionTh>
          <TableTransactionTh>Data</TableTransactionTh>
          {(onEdit || onDelete) && <TableTransactionTh>Ações</TableTransactionTh>}
        </Tr>
      </Thead>

      <Tbody>
        {data.map((transaction) => {
          const isIncome = transaction.type === "deposit"

          return (
            <Tr key={transaction.id} _hover={{ bg: "gray.600" }} cursor="pointer">
              <Td borderColor="gray.600">
                {transaction.title}
              </Td>

              <Td borderColor="gray.600" color={isIncome ? "green.400" : "red.400"}>
                {transaction.amount}
              </Td>

              <Td borderColor="gray.600">
                {transaction.date}
              </Td>

              {(onEdit || onDelete) && (
                <Td borderColor="gray.600">
                  <HStack spacing={4}>
                    {onEdit && (
                      <Icon
                        as={FiEdit3}
                        width={5}
                        height={5}
                        onClick={() => onEdit(transaction)}
                        transition="200ms"
                        _hover={{ color: "yellow.500" }}
                      />
                    )}

                    {onDelete && (
                      <Icon
                        as={FiTrash}
                        width={5}
                        height={5}
                        onClick={() => onDelete(transaction.id)}
                        transition="200ms"
                        _hover={{ color: "red.400" }}
                      />
                    )}
                  </HStack>
                </Td>
              )}
            </Tr>
          )
        })}
      </Tbody>

      <Tfoot>
        <Tr>
          <Th></Th>
        </Tr>
      </Tfoot>
    </Table>
  )
}
