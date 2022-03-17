export type ITransactionTypeProp = "deposit" | "withdraw"

// TODO: usar Enum  - https://www.typescriptlang.org/docs/handbook/enums.html
export type ITransactionTypeRecurrenceProp = ""
  | "every_1_week"
  | "every_15_days"
  | "monthly"
  | "yearly"
  | "installments"

export interface ITransactionForRegister {
  idUser: string
  title: string
  amount: number
  date: string
  status: string
  typeRecurrence: ITransactionTypeRecurrenceProp
  isRecurrence: boolean
  installments: string
  type: ITransactionTypeProp
}

export interface ITransactionForCreate extends ITransactionForRegister {
  idRecurrence: string
}

export interface ITransaction {
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
  type: ITransactionTypeProp
}

export type ITransactionPartial = Partial<ITransaction>
