export type TransactionTypeProps = "deposit" | "withdraw"

export interface TransactionStateProps {
  title: string
  amount: string
  date: string
  status: string
  typeRecurrence: string
  installments: string
  type: TransactionTypeProps | null
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
  installments: string
  type: TransactionTypeProps
}

export interface TransactionModelProps {
  idUser: string
  title: string
  amount: number
  date: string
  status: string
  typeRecurrence: string
  installments: string
  type: TransactionTypeProps
}
