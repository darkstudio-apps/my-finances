import { GetServerSideProps } from "next"
import { getSession, signIn, signOut, useSession } from "next-auth/client"
import { Flex, Stack, Button } from "@chakra-ui/react"

export default function SignIn() {
  const [session, loading] = useSession()

  return (
    <Flex
      width="100vw"
      height="100vh"
      position="absolute"
      top="0"
      left="0"
      zIndex={100}
      backgroundColor="gray.800"
      align="center"
      justify="center"
    >
      {session ? (
        <Stack>
          Signed in as {session?.user?.email} <br />
          <Button
            type="submit"
            mt="6"
            size="lg"
            colorScheme="red"
            isLoading={loading}
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        </Stack>
      ) : (
        <Button
          type="submit"
          mt="6"
          size="lg"
          colorScheme="blue"
          isLoading={loading}
          onClick={() => signIn("google")}
        >
          Entrar com Google
        </Button>
      )}
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      props: {},
      redirect: {
        destination: "/transactions",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
