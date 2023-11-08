import { Stack, Text, Heading, HStack } from "@chakra-ui/react"
import { Icon } from "components"
import { ITransactionSummary } from "models/transactions"

interface ITransactionsSummaryMobile {
  summary: ITransactionSummary
}

export function TransactionsSummaryMobile({ summary }: ITransactionsSummaryMobile) {
  return (
    <Stack bg="gray.700" borderRadius="xl" padding={4} spacing={2}>
      <HStack alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" spacing={2}>
          <Icon name="arrowUp" width={4} height={4} />

          <Text fontSize="sm">Entradas</Text>
        </HStack>

        <Heading size="sm">{summary.deposit}</Heading>
      </HStack>

      <HStack alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" spacing={2}>
          <Icon name="arrowDown" width={4} height={4} />

          <Text fontSize="sm">Saídas</Text>
        </HStack>

        <Heading size="sm">{summary.withdraw}</Heading>
      </HStack>

      <HStack alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" spacing={2}>
          <Icon name="dollarSign" width={4} height={4} />

          <Text fontSize="sm">Saldo</Text>
        </HStack>

        <Heading size="sm">{summary.total}</Heading>
      </HStack>
    </Stack>
  )
}
