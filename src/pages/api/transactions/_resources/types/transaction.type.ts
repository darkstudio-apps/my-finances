export type TransactionTypeProps = "deposit" | "withdraw"

export interface TransactionModelProps {
  idUser: string
  title: string
  amount: number
  date: string
  status: string
  typeRecurrence: string
  isRecurrence: boolean
  installments: string
  type: TransactionTypeProps
}

export interface TransactionReqProps {
  id: string
  idUser: string
  title: string
  amount: number
  date: string
  status: string
  idRecurrence: string
  typeRecurrence: string
  isRecurrence: boolean
  installments: string
  type: TransactionTypeProps
}
