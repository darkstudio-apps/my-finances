import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"

export const Authorization = (apiRoute: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).send({ error: "Not authorized" })
  }

  return apiRoute(req, res)
}
