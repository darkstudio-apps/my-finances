import { NextApiResponse } from "next"
import { transactionServiceList } from "../transactionService"
import { ITransactionRequestRoot } from "../types/transactionRequest.type"

export async function transactionControllerList(
  req: ITransactionRequestRoot,
  res: NextApiResponse
) {
  try {
    const { idUser, month, year } = req.query

    const response = await transactionServiceList({ idUser, month, year })

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
