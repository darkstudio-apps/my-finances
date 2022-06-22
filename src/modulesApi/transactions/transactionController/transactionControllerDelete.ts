import { NextApiResponse } from "next"
import { transactionServiceDelete } from "../transactionService"
import { ITransactionRequest } from "../types/transactionRequest.type"

export async function transactionControllerDelete(
  req: ITransactionRequest,
  res: NextApiResponse
) {
  try {
    const { idUser, id, action } = req.query

    const response = await transactionServiceDelete({ idUser, id, action })

    if (response) {
      // TODO: retornar 201 e remover o corpo
      return res.status(200).json({ message: "Success" })
    }

    return res.status(400).end()
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
