import { NextApiRequest, NextApiResponse } from "next"
import { userService } from "../services/userService"
import { RequestPostType, RequestType } from "../types/userRequests.type"

async function list(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await userService.list()
    return res.status(200).json({ users })
  } catch (error) {
    return res.status(400).json({ message: error })
  }

}

async function get(req: RequestType, res: NextApiResponse) {
  try {
    const { id } = req.query

    const user = await userService.get(id)

    return res.status(200).json({ user })
  } catch (error) {
    return res.status(400).json({ message: error })
  }

}

async function post(req: RequestPostType, res: NextApiResponse) {
  try {
    const { body } = req

    const user = await userService.post(body)

    return res.status(200).json({ user })
  } catch (error) {
    return res.status(400).json({ message: error })
  }

}

async function put(req: RequestType, res: NextApiResponse) {
  try {
    const { query, body } = req

    const user = await userService.put(query.id, body)

    return res.status(200).json({ user })
  } catch (error) {
    return res.status(400).json({ message: error })
  }

}

function patch(req: RequestType, res: NextApiResponse) {
  try {
    const { query, body } = req

    const user = userService.put(query.id, body)

    return res.status(200).json({ user })
  } catch (error) {

  }

}

async function remove(req: RequestType, res: NextApiResponse) {
  try {
    const { id } = req.query
    await userService.remove(id)

    return res.status(200).json({ message: "Success" })

  } catch (error) {
    return res.status(400).json({ message: error })
  }

}

export const userController = {
  list,
  get,
  post,
  put,
  patch,
  remove,
}
