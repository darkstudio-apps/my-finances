import { useTransactions } from "contexts/transactions"
import { useIsDesktopMode } from "utils/helpers"
import { TransactionsSummaryMobile } from "./TransactionsSummaryMobile"
import { TransactionsSummaryDesktop } from "./TransactionsSummaryDesktop"

export function TransactionsSummarySection() {
  const { summary } = useTransactions()

  const isDesktopMode = useIsDesktopMode()

  return (
    isDesktopMode
      ? <TransactionsSummaryDesktop summary={summary} />
      : <TransactionsSummaryMobile summary={summary} />
  )
}
