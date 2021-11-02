import { Avatar, Box, Flex, Heading, HStack, Text, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { signOut, useSession } from "next-auth/client"
// import { ActiveLink } from "./ActiveLink"

export function Header() {
  const [session] = useSession()

  const handleSignOut = () => {
    signOut()
  }

  return (
    <Flex as="header" align="center" justify="space-between" paddingY={8}>
      <Heading size="lg" color="gray.200">My Finances</Heading>

      <HStack as="nav" spacing={8}>
        {/* <ActiveLink href="/transactions">Transações</ActiveLink> */}
        {/* <ActiveLink href="/lists">Listas</ActiveLink> */}
      </HStack>

      <HStack spacing={4}>
        <Box>
          <Heading fontSize="xl" fontWeight="semibold" color="gray.200">{session?.user?.name}</Heading>
          <Text fontSize="xs" color="gray.200">1 pendência</Text>
        </Box>

        <Menu>
          <MenuButton>
            <Avatar name={session?.user?.name || ""} src={session?.user?.image || ""} />
          </MenuButton>

          <MenuList>
            <MenuItem onClick={handleSignOut}>Sair</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  )
}
