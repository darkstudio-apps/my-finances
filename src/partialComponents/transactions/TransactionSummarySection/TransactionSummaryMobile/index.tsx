import { Stack, Text, Heading, HStack } from "@chakra-ui/react"
import { Icon } from "components"
import { ITransactionSummary } from "models/transactions"

interface ITransactionSummaryMobile {
  summary: ITransactionSummary
}

export function TransactionSummaryMobile({ summary }: ITransactionSummaryMobile) {
  return (
    <Stack bg="gray.700" borderRadius="xl" padding={4} spacing={2}>
      <HStack alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" spacing={2}>
          <Icon name="arrowUp" width={5} height={5} />

          <Text fontSize="md">Entradas</Text>
        </HStack>

        <Heading size="sm">{summary.deposit}</Heading>
      </HStack>

      <HStack alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" spacing={2}>
          <Icon name="arrowDown" width={5} height={5} />

          <Text fontSize="md">Saídas</Text>
        </HStack>

        <Heading size="sm">{summary.withdraw}</Heading>
      </HStack>

      <HStack alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" spacing={2}>
          <Icon name="dollarSign" width={5} height={5} />

          <Text fontSize="md">Saldo</Text>
        </HStack>

        <Heading size="sm">{summary.total}</Heading>
      </HStack>
    </Stack>
  )
}
