import { Transactions } from ".prisma/client"
import { NextApiRequest } from "next"
import { TransactionModelProps, TransactionReqProps } from "../../../../../hooks/useTransactions/transaction.types"

export interface RequestType {
  query: {
    id: string
  }
  body: Partial<TransactionReqProps>
}

export interface RequestPostType extends NextApiRequest {
  body: Transactions
}
