import { SimpleGrid } from "@chakra-ui/react"
import { CardTransaction } from "components"
import { ITransactionSummary } from "models/transactions"

interface ITransactionSummaryDesktop {
  summary: ITransactionSummary
}

export function TransactionSummaryDesktop({ summary }: ITransactionSummaryDesktop) {
  return (
    <SimpleGrid columns={[1, 1, 3]} spacing={[6, 10]}>
      <CardTransaction
        description="Entradas"
        title={summary.deposit}
        icon="arrowUp"
      />

      <CardTransaction
        description="Saídas"
        title={summary.withdraw}
        icon="arrowDown"
      />

      <CardTransaction
        description="Saldo"
        title={summary.total}
        icon="dollarSign"
      />
    </SimpleGrid>
  )
}
