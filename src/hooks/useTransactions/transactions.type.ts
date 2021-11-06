export type TransactionTypeProps = "deposit" | "withdraw"

export interface TransactionReqProps {
  id: string
  title: string
  amount: number
  date: string
  type: TransactionTypeProps
  category?: string
}

export interface TransactionModelProps {
  title: string
  amount: number
  date: string
  type: TransactionTypeProps
  category?: string
}
