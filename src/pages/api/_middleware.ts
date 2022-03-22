import { getToken } from "next-auth/jwt"
import { NextResponse, NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const isAuthRoute = request.url.includes("/api/auth")

  if (isAuthRoute) return NextResponse.next()

  try {
    const token = await getToken({
      req: request as any,
      secret: process.env.JWT_SECRET,
    })

    const isToken = !!token

    if (!isToken) {
      return new Response("Not authorized", {
        status: 401,
      })
    }

    return NextResponse.next()
  } catch (error) {
    return new Response("Internal Error", {
      status: 500,
    })
  }
}
