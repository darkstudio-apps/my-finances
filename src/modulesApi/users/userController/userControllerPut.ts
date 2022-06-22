import { NextApiResponse } from "next"
import { userServicePut } from "../userService"
import { IUserRequestPut } from "../types/userRequest.type"

export async function userControllerPut(req: IUserRequestPut, res: NextApiResponse) {
  try {
    const { query, body } = req

    const response = await userServicePut(query.id, body)

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
