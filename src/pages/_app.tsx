import Head from "next/head"
import { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { QueryClientProvider } from "react-query"
import { Box, ChakraProvider, Divider } from "@chakra-ui/react"
import { Header } from "components"
import { queryClient } from "libs/queryClient"
import { theme } from "styles/theme"
import "styles/scrollbar.css"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>My Finances</title>
        </Head>

        <ChakraProvider theme={theme}>
          <Box maxW="1168px" h="100dvh" mx="auto" px={[3, 3, 6]}>
            <Header />
            <Divider borderColor="gray.700" />
            <Component {...pageProps} />
          </Box>
        </ChakraProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
