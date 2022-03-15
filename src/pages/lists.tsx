import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"

export default function Lists() {
  return (
    <h1>lists</h1>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
