import { useTransactions } from "contexts/transactions"
import { useIsDesktopMode } from "utils/helpers"
import { TransactionSummaryMobile } from "./TransactionSummaryMobile"
import { TransactionSummaryDesktop } from "./TransactionSummaryDesktop"

export function TransactionSummarySection() {
  const { summary } = useTransactions()

  const isDesktopMode = useIsDesktopMode()

  return (
    isDesktopMode
      ? <TransactionSummaryDesktop summary={summary} />
      : <TransactionSummaryMobile summary={summary} />
  )
}
