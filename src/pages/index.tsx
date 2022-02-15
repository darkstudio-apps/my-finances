import { GetServerSideProps } from "next"
import { getSession, signIn } from "next-auth/client"
import { Heading, Text, Stack, HStack, Button, Image } from "@chakra-ui/react"

export default function SignIn() {
  return (
    <HStack
      width="100vw"
      height="100vh"
      position="absolute"
      top="0"
      left="0"
      zIndex={100}
      backgroundColor="gray.800"
      align="center"
      justify="center"
      spacing={20}
      paddingBottom={12}
    >
      <Stack width={["80%", "initial"]} spacing={10}>
        <HStack>
          <Image src="./icons/money-with-wings.svg" alt="money-with-wings" />
          <Heading fontSize={["xl", "3xl"]}>My Finances</Heading>
        </HStack>

        <Stack spacing={8}>
          <Heading fontSize={["5xl", "7xl"]} lineHeight="112%">
            Organize suas <br />
            finanças com <br />
            simplicidade
          </Heading>

          <Text fontSize="2xl">Acesse <Text as="b" color="green.200">gratuitamente</Text></Text>
        </Stack>

        <Button
          size="lg"
          maxWidth={["initial", "280px"]}
          borderRadius="full"
          colorScheme="green"
          mt="6"
          onClick={() => signIn("google")}
        >
          Entrar com Google
        </Button>
      </Stack>

      <Image
        maxWidth="470px"
        src="./illustrations/Partnership-bro.svg"
        alt="Partnership-bro"
        display={["none", "none", "none", "block"]}
      />
    </HStack>
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
