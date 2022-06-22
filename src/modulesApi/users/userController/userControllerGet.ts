import { NextApiResponse } from "next"
import { userServiceGet } from "../userService"
import { IUserRequestGet } from "../types/userRequest.type"

export async function userControllerGet(req: IUserRequestGet, res: NextApiResponse) {
  try {
    const { id } = req.query

    const user = await userServiceGet(id)

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
