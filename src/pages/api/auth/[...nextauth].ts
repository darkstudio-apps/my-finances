
import NextAuth, { User } from "next-auth"
import Providers from "next-auth/providers"

import { userService } from "../_modules/users/services/userService"
import { userRepository } from "../_modules/users/repository/userRepository"

import { UserModelProps } from "../../../hooks/useUsers/user.types"

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async session(session) {
      try {
        const user = await userService.get(String(session.user?.email))

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
    async signIn(user: User) {
      try {
        const { name, email } = user

        const userObj: UserModelProps = {
          name: String(name),
          email: String(email),
        }

        // TODO: Criar esse metodo no userServices e não acessar o repository direto
        await userRepository.upsert(userObj)

        return true
      } catch (error) {
        return false
      }
    },
  },
})
