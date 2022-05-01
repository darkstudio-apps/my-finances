export type TransactionTypeProps = "deposit" | "withdraw"

// TODO: Usar Enum
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

// ------------------------ REFACTOR ------------------------

export interface ITransactionGetFilters {
  month: string
  year: string
}

export interface ITransaction extends ITransactionRequest {
  dateDisplay: string
  amountDisplay: string
  statusDisplay: string
}

// ------------------------ Mover para o arquivo de transaction.request ------------------------

export interface ITransactionRequest {
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

export interface ITransactionRequestGet {
  search: {
    dateStart: number // aaaa-mm-dd
    dateEnd: number // aaaa-mm-dd
  },
  length: number
  data: ITransactionRequest[]
  transaction?: ITransactionRequest
}

export interface ITransactionRequestPost {
  idUser: string
  title: string
  amount: number
  date: string
  status: string
  typeRecurrence: string
  installments: string
  type: TransactionTypeProps
}

// TODO: editar o nome para "ITransactionRequestAction"
export type ITransactionActionRequest = "current" | "next" | "all"

// TODO: editar o nome para "ITransactionRequestEdit"
export interface ITransactionEditRequest {
  id: string
  transaction: TransactionModelProps
  action: ITransactionActionRequest
}
