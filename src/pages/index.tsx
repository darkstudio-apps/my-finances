import { Flex, Button } from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function SignIn() {
  const router = useRouter()

  const handleSignIn = () => {
    router.push("/transactions")
  }

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
      <Button
        type="submit"
        mt="6"
        size="lg"
        colorScheme="blue"
        isLoading={false}
        onClick={handleSignIn}
      >
        Entrar com Google
      </Button>
    </Flex>
  )
}

var get = () => {
  var urlCardInfo = "https://prod-global-webapp-proxy.nubank.com.br/api/proxy/AJxL5LBovXDuZA9OWntVOvcUFnTXWe-2zA.aHR0cHM6Ly9wcm9kLXM5LWZhY2FkZS5udWJhbmsuY29tLmJyL2FwaS9hY2NvdW50cy81Y2VlOWEzOC02MzVhLTQwYzktOWRjNC1hMGQxZGY2MWJjODI"
  fetch(urlCardInfo).then(res => res.json()).then(data => console.log(data))
}
