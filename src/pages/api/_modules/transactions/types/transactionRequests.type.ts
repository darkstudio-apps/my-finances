import { NextApiRequest } from "next"
import { TransactionModelProps, TransactionReqProps } from "./transaction.type"

export interface RequestType {
  query: {
    id: string
  }
  body: Partial<TransactionReqProps>
}

export interface RequestPostType extends NextApiRequest {
  body: TransactionModelProps
}

export type PartialTransactionReq = Partial<TransactionReqProps>

export interface TransactionModelCreateProps extends TransactionModelProps {
  idRecurrence: string
}
