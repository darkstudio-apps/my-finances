import { AppProps } from "next/app"
import { Provider } from "next-auth/client"
import Head from "next/head"
import { QueryClientProvider } from "react-query"
import { Box, ChakraProvider, Divider } from "@chakra-ui/react"

import { Header } from "../components/Header"
import { queryClient } from "../services/queryClient"

import { theme } from "../styles/theme"
import "../styles/scrollbar.css"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider session={session}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>My Finances</title>
        </Head>

        <ChakraProvider theme={theme}>
          <Box maxW="1168px" h="100vh" mx="auto" px={6}>
            <Header />
            <Divider borderColor="gray.700" />
            <Component {...pageProps} />
          </Box>
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
