import { NextApiResponse } from "next"
import { transactionService } from "../services/transactionService"
import { ITransactionRequest, ITransactionRequestRoot } from "../types/transactionRequest.type"

async function list(req: ITransactionRequestRoot, res: NextApiResponse) {
  try {
    const { idUser, month, year } = req.query

    const transactionsData = await transactionService.list({ idUser, month, year })

    return res.status(200).json(transactionsData)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

async function get(req: ITransactionRequest, res: NextApiResponse) {
  try {
    const { idUser, id } = req.query

    const transactionData = await transactionService.get(idUser, id)

    return res.status(200).json(transactionData)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

async function post(req: ITransactionRequestRoot, res: NextApiResponse) {
  try {
    const { body } = req
    const { idUser } = req.query

    const transactionData = await transactionService.post(idUser, body)

    return res.status(200).json(transactionData)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

async function put(req: ITransactionRequest, res: NextApiResponse) {
  try {
    const { idUser, id, action } = req.query
    const transaction = req.body

    // TODO: retornar um obj no formato de data que está implementado no list
    const transactionData = await transactionService.put({ idUser, id, action, transaction })

    return res.status(200).json({ transaction: transactionData })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

async function remove(req: ITransactionRequest, res: NextApiResponse) {
  try {
    const { idUser, id, action } = req.query

    const response = await transactionService.remove({ idUser, id, action })

    if (response) {
      // TODO: retornar 201 e remover o corpo
      return res.status(200).json({ message: "Success" })
    }

    return res.status(400).end()
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

export const transactionController = {
  list,
  get,
  post,
  put,
  remove,
}
