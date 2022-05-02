import { useState } from "react"
import { UseMutationResult } from "react-query"
import { Box, Text, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Icon, HStack, useDisclosure } from "@chakra-ui/react"
import { FiEdit3, FiTrash } from "react-icons/fi"
import { TableTransactionTh } from "./TableTransactionTh"
import { NoContentTableTransaction } from "./NoContentTableTransaction"
import { AlertDialogDelete } from "components/AlertDialogDelete"
import { useTransactions } from "contexts/transactions"
import { ITransaction } from "models/transactions/transaction"

interface TableTransactionProps {
  data: ITransaction[] | undefined
  isLoading: boolean
  handleEnableModal?: (transaction: ITransaction, editMode?: boolean) => void
  onDelete?: UseMutationResult<void, unknown, string, unknown>
}

const colorStatus: any = {
  deposit: "orange.600",
  withdraw: "orange.600",
  overdue: "red.600",
  paid: "green.600",
}

const getColorStatus = (type: string) => {
  const color = colorStatus[type]
  return color ? color : "gray.400"
}

export function TableTransaction({ data, isLoading, handleEnableModal }: TableTransactionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { deleteTransaction, transactions } = useTransactions()

  const [idTransaction, setIdTransaction] = useState("")

  const openDialogDelete = (idTransaction: string) => {
    setIdTransaction(idTransaction)
    onOpen()
  }

  const submitDialogDelete = async (idTransaction: string) => {
    onClose()
    await deleteTransaction.mutateAsync(idTransaction)
  }

  if (isLoading) return null

  if (!data || data.length < 1) {
    return <NoContentTableTransaction />
  }

  return (
    <Table variant="simple" bg="gray.700" borderRadius="xl">
      <Thead>
        <Tr>
          <TableTransactionTh>Status</TableTransactionTh>
          <TableTransactionTh>Título</TableTransactionTh>
          <TableTransactionTh>Valor</TableTransactionTh>
          <TableTransactionTh>Data</TableTransactionTh>
          <TableTransactionTh>Ações</TableTransactionTh>
        </Tr>
      </Thead>

      <Tbody>
        {transactions.data?.map((transaction) => {
          const isIncome = transaction.type === "deposit"

          return (
            <Tr
              key={transaction.id}
              name="tr-transaction"
              _hover={{ bg: "gray.600" }}
              cursor="pointer"
            >
              <Td borderColor="gray.600" onClick={() => handleEnableModal && handleEnableModal(transaction)}>
                <HStack spacing={4}>
                  <Box w={2} maxW={2} h={2} borderRadius="100%" bg={getColorStatus(transaction.status)} />
                  <Text>{transaction.statusDisplay}</Text>
                </HStack>
              </Td>

              <Td borderColor="gray.600" onClick={() => handleEnableModal && handleEnableModal(transaction)}>
                {transaction.title}
              </Td>

              <Td borderColor="gray.600" onClick={() => handleEnableModal && handleEnableModal(transaction)} color={isIncome ? "green.400" : "red.400"}>
                {isIncome ? transaction.amountDisplay : `- ${transaction.amountDisplay}`}
              </Td>

              <Td borderColor="gray.600" onClick={() => handleEnableModal && handleEnableModal(transaction)}>
                {transaction.dateDisplay}
              </Td>

              <Td borderColor="gray.600">
                <HStack spacing={4}>
                  {handleEnableModal && (
                    <Icon
                      as={FiEdit3}
                      width={5}
                      height={5}
                      onClick={() => handleEnableModal(transaction, true)}
                      transition="200ms"
                      _hover={{ color: "yellow.500" }}
                    />
                  )}

                  <Icon
                    as={FiTrash}
                    width={5}
                    height={5}
                    onClick={() => openDialogDelete(transaction.id)}
                    transition="200ms"
                    _hover={{ color: "red.400" }}
                  />
                </HStack>
              </Td>
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
              isLoading={deleteTransaction.isLoading}
            />
          </Th>
        </Tr>
      </Tfoot>
    </Table>
  )
}
