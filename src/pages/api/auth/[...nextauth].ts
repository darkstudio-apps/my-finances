
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { userService } from "../_modules/users/services/userService"
import { userRepository } from "../_modules/users/repository/userRepository"
// TODO: mudar a tipagem - usar a tipagem do back essa é a do front
import { UserModelProps } from "models/users/user"

export default NextAuth({
  providers: [
    Google({
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

        const { user } = await userService.get(userEmail)

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
