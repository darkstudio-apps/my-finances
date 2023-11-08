import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { ITransaction } from "models/transactions"
import { getColorStatus } from "../TransactionListHelpers"

interface ITransactionListMobile {
  data: ITransaction[]
  openDialogDelete: (transaction: ITransaction) => void
  handleEnableModal: (transactionToEdit: ITransaction, editMode?: boolean) => void
}

export function TransactionListMobile({ data, handleEnableModal }: ITransactionListMobile) {
  return (
    <Stack spacing={3}>
      {data.map((transaction) => {
        const isIncome = transaction.type === "deposit"

        return (
          <Stack
            key={transaction.id}
            bg="gray.700"
            borderRadius="xl"
            padding={3}
            spacing={1}
            onClick={() => handleEnableModal(transaction)}
          >
            <Text>{transaction.title}</Text>

            <HStack spacing={6}>
              <HStack spacing={2}>
                <Box w={2} maxW={2} h={2} borderRadius="100%" bg={getColorStatus(transaction.status)} />
                <Text>{transaction.statusDisplay}</Text>
              </HStack>

              <Text>{transaction.dateDisplay}</Text>

              <Text>
                {
                  isIncome
                    ? transaction.amountDisplay
                    : `- ${transaction.amountDisplay}`
                }
              </Text>
            </HStack>
          </Stack>
        )
      })}
    </Stack>
  )
}
