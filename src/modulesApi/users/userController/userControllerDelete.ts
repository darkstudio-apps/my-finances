import { NextApiResponse } from "next"
import { userServiceDelete } from "../userService"
import { IUserRequestRemove } from "../types/userRequest.type"

export async function userControllerDelete(req: IUserRequestRemove, res: NextApiResponse) {
  try {
    const { id } = req.query

    await userServiceDelete(id)

    const response = {
      message: "Success",
    }

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
