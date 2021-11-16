export type TransactionTypeProps = "deposit" | "withdraw"

export interface TransactionReqProps {
  id: string
  idUser: string
  title: string
  amount: number
  date: string
  status: string
  recurrence: string
  type: TransactionTypeProps
}

export interface TransactionModelProps {
  idUser: string
  title: string
  amount: number
  date: string
  status?: string
  recurrence?: string
  type: TransactionTypeProps
}
