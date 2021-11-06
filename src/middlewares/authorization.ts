import jwt from "next-auth/jwt"

const secret = process.env.JWT_SECRET

import { getSession } from "next-auth/client"

const token = await jwt.getToken({ req, secret })
const session = await getSession({ req })
