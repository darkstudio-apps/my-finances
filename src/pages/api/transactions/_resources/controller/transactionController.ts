import { NextApiRequest, NextApiResponse } from "next"
import { RequestPostType, RequestType } from "../types/transactionRequests.type"
import { transactionService } from "../services/transactionService"

async function list(req: NextApiRequest, res: NextApiResponse) {
  try {
    const transactions = await transactionService.list()
    return res.status(200).json({ transactions })
  } catch (error) {
    return res.status(400).json({ message: error })
  }

}

async function get(req: RequestType, res: NextApiResponse) {
  try {
    const { id } = req.query

    const transaction = await transactionService.get(id)

    return res.status(200).json({ transaction })
  } catch (error) {
    return res.status(400).json({ message: error })
  }

}

async function post(req: RequestPostType, res: NextApiResponse) {
  try {
    const { body } = req

    const transaction = await transactionService.post(body)

    return res.status(200).json({ transaction })
  } catch (error) {
    return res.status(400).json({ message: error })
  }

}

async function put(req: RequestType, res: NextApiResponse) {
  try {
    const { query, body } = req

    const transaction = await transactionService.put(query.id, body)

    return res.status(200).json({ transaction })
  } catch (error) {
    return res.status(400).json({ message: error })
  }

}

function patch(req: RequestType, res: NextApiResponse) {
  try {
    const { query, body } = req

    const transaction = transactionService.put(query.id, body)

    return res.status(200).json({ transaction })
  } catch (error) {

  }

}

async function remove(req: RequestType, res: NextApiResponse) {
  try {
    const { id } = req.query
    await transactionService.remove(id)

    return res.status(200).json({ message: "Success" })

  } catch (error) {
    return res.status(400).json({ message: error })
  }

}

export const transactionController = {
  list,
  get,
  post,
  put,
  patch,
  remove,
}
