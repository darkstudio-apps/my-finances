import { Avatar, Box, Flex, Heading, HStack, Text } from "@chakra-ui/react"
import { ActiveLink } from "./ActiveLink"

export function Header() {
  return (
    <Flex as="header" align="center" justify="space-between" paddingY={8}>
      <Heading size="lg" color="gray.200">My Finances</Heading>

      <HStack as="nav" spacing={8}>
        <ActiveLink href="/transactions">Transações</ActiveLink>
        <ActiveLink href="/lists">Listas</ActiveLink>
      </HStack>

      <HStack spacing={4}>
        <Box >
          <Heading fontSize="xl" fontWeight="semibold" color="gray.200">Vitor DevSP</Heading>
          <Text fontSize="xs" color="gray.200">1 pendência</Text>
        </Box>

        <Avatar name="Vitor DevSP" src="" />
      </HStack>
    </Flex>
  )
}
