import { NextApiRequest, NextApiResponse } from "next"
import { RequestPostType } from "../.."
import { RequestType } from "../../[id]"

import { transactionService } from "../services/transactionService"

function list(req: NextApiRequest, res: NextApiResponse) {
  const transactions = transactionService.list()
  return res.status(200).json({ transactions })
}

function get(req: RequestType, res: NextApiResponse) {
  const { id } = req.query

  const transaction = transactionService.get(id)

  return res.status(200).json({ transaction })
}

function post(req: RequestPostType, res: NextApiResponse) {
  const { body } = req

  const transaction = transactionService.post(body)

  return res.status(200).json({ transaction })
}

function put(req: RequestType, res: NextApiResponse) {
  const { query, body } = req

  const transaction = transactionService.put(query.id, body)

  return res.status(200).json({ transaction })
}

function patch(req: RequestType, res: NextApiResponse) {
  const { query, body } = req

  const transaction = transactionService.put(query.id, body)

  return res.status(200).json({ transaction })
}

function remove(req: RequestType, res: NextApiResponse) {
  const { id } = req.query

  const ok = transactionService.remove(id)

  return res.status(200).json({ ok })
}

export const transactionController = {
  list,
  get,
  post,
  put,
  patch,
  remove,
}
