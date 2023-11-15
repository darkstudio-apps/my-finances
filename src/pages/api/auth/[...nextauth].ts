
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import NextAuth, { getServerSession, NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { userServiceGet, userServiceUpsert } from "modulesApi/users/userService"
import { IUserRequestPost } from "models/users"

const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ session }) {
      try {
        const userEmail = session.user?.email

        if (typeof userEmail !== "string") throw new Error("User email not found")

        const { user } = await userServiceGet(userEmail)

        if (user) {
          const idUser = user.id

          return {
            ...session,
            user: {
              ...session.user,
              idUser,
            },
          }
        }

        return session
      } catch (error) {
        return session
      }
    },
    async signIn({ user }) {
      try {
        const { name, email } = user

        if (typeof name !== "string" || typeof email !== "string") {
          throw new Error("invalid data")
        }

        const userObj: IUserRequestPost = {
          name,
          email,
        }

        await userServiceUpsert(userObj)

        return true
      } catch (error) {
        return false
      }
    },
  },
}

interface GetServerSessionCustom {
  req: GetServerSidePropsContext["req"] | NextApiRequest
  res: GetServerSidePropsContext["res"] | NextApiResponse
}

export function getServerSessionCustom({ req, res }: GetServerSessionCustom) {
  return getServerSession(req, res, nextAuthOptions)
}

export default NextAuth(nextAuthOptions)
