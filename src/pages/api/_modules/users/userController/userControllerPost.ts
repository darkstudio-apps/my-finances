import { NextApiResponse } from "next"
import { userServicePost } from "../userService"
import { IUserRequestPost } from "../types/userRequest.type"

export async function userControllerPost(req: IUserRequestPost, res: NextApiResponse) {
  try {
    const { body } = req

    const response = await userServicePost(body)

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
