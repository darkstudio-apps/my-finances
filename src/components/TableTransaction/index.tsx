import { useState } from "react"
import { Box, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Icon, HStack, useDisclosure } from "@chakra-ui/react"
import { FiEdit3, FiTrash } from "react-icons/fi"

import { TableTransactionTh } from "./TableTransactionTh"
import { TransactionProps } from "../../hooks/useTransactions"
import { AlertDialogDelete } from "../AlertDialogDelete"

interface TableTransactionProps {
  data: TransactionProps[]
  onEdit?: (transaction: TransactionProps) => void
  onDelete?: (idTransaction: string) => void
}

export function TableTransaction({ data, onEdit, onDelete }: TableTransactionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [idTransaction, setIdTransaction] = useState("")

  const openDialogDelete = (idTransaction: string) => {
    setIdTransaction(idTransaction)
    onOpen()
  }

  const submitDialogDelete = (idTransaction: string) => {
    onClose()
    onDelete && onDelete(idTransaction)
  }

  return (
    <Table variant="simple" bg="gray.700" borderRadius="xl">
      <Thead>
        <Tr>
          <TableTransactionTh>Status</TableTransactionTh>
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
                <Box w={2} h={2} borderRadius="100%" bg="green.600" />
              </Td>

              <Td borderColor="gray.600">
                {transaction.title}
              </Td>

              <Td borderColor="gray.600" color={isIncome ? "green.400" : "red.400"}>
                {transaction.amountDisplay}
              </Td>

              <Td borderColor="gray.600">
                {transaction.dateDisplay}
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
                        onClick={() => openDialogDelete(transaction.id)}
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
          <Th>
            <AlertDialogDelete
              id={idTransaction}
              title="Deletar transação"
              description="Deseja realmente exluir a transação?"
              isOpen={isOpen}
              onClose={onClose}
              onSubmit={submitDialogDelete}
            />
          </Th>
        </Tr>
      </Tfoot>
    </Table>
  )
}
