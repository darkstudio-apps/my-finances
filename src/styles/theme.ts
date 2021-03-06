import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  styles: {
    global: {
      body: {
        bg: "gray.800",
        color: "gray.50",
      },
    },
  },
  fonts: {
    body: "\"Fira Sans\", sans-serif",
    heading: "\"Fira Sans\", sans-serif",
  },
})
