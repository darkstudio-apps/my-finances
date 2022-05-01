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

export interface ITransaction extends ITransactionResponse {
  dateDisplay: string
  amountDisplay: string
  statusDisplay: string
}

// ------------------------ Mover para o arquivo de transaction.request ------------------------

// TODO: renomear para "ITransactionRequestQueryAction"
export type ITransactionRequestAction = "current" | "next" | "all"

export interface ITransactionRequestBase {
  idUser: string
  title: string
  amount: number
  date: string
  status: string
  typeRecurrence: string
  installments: string
  type: TransactionTypeProps
}

export type ITransactionRequestPost = ITransactionRequestBase

export interface ITransactionRequestPut {
  id: string
  transaction: ITransactionRequestBase
  action: ITransactionRequestAction
}

// ------------------------ Mover para o arquivo de transaction.response ------------------------

export interface ITransactionResponse {
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

export interface ITransactionResponseGet {
  search: {
    dateStart: number // aaaa-mm-dd
    dateEnd: number // aaaa-mm-dd
  },
  length: number
  data: ITransactionResponse[]
  transaction?: ITransactionResponse
}

export interface ITransactionResponsePost {
  transaction?: ITransactionResponse
}

export interface ITransactionResponsePut {
  transaction?: ITransactionResponse | any
}

export interface ITransactionResponseDelete {
  message: "Success"
}
