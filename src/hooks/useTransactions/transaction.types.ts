export type TransactionTypeProps = "deposit" | "withdraw"

export type TransactionTypeRecurrenceProps = ""
  | "every_1_week"
  | "every_15_days"
  | "monthly"
  | "yearly"
  | "installments"

export interface TransactionStateProps {
  title: string
  amount: string
  date: string
  status: string
  typeRecurrence: string
  installments: string
  type: TransactionTypeProps | null
}

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
