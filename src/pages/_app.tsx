import { AppProps } from "next/app"
import Head from "next/head"
import { Box, ChakraProvider, Divider } from "@chakra-ui/react"

import { Header } from "../components/Header"

import { theme } from "../styles/theme"
import "../styles/scrollbar.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Projects Manager</title>
      </Head>

      <Box maxW="1168px" mx="auto" px={6}>
        <Header />
        <Divider borderColor="gray.700" />
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
