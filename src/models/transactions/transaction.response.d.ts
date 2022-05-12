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
  type: ITransactionPropType
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
