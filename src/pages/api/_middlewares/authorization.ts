import { NextApiResponse } from "next"
import { getSession } from "next-auth/react"

const authorization = (apiRoute: any) => async (req: any, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).send({ error: "Not authorized" })
  }

  req.session = session

  return apiRoute(req, res)
}

export default authorization
