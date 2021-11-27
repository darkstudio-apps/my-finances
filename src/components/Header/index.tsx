import { Avatar, Tag, Box, Flex, Heading, HStack, Text, Menu, MenuButton, MenuList, MenuItem, Image } from "@chakra-ui/react"
import { signOut, useSession } from "next-auth/client"
// import { ActiveLink } from "./ActiveLink"

const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV

export function Header() {
  const [session] = useSession()

  const handleSignOut = () => {
    signOut()
  }

  return (
    <Flex as="header" align="center" justify="space-between" paddingY={8}>
      <HStack spacing={4}>
        <Image src="./icons/money-with-wings.svg" alt="money" />
        <Heading size="lg" color="gray.200">My Finances</Heading>
        <Tag size="sm">
          {
            VERCEL_ENV === "production"
              ? "v0.2 Beta"
              : VERCEL_ENV === "preview"
                ? "Homolog | v0.2 Beta"
                : "Develop | v0.2 Beta"
          }
        </Tag>
      </HStack>

      <HStack as="nav" spacing={8}>
        {/* <ActiveLink href="/transactions">Transações</ActiveLink> */}
        {/* <ActiveLink href="/lists">Listas</ActiveLink> */}
      </HStack>

      <HStack spacing={4}>
        <Box>
          <Heading fontSize="xl" fontWeight="semibold" color="gray.200">{session?.user?.name}</Heading>
          <Text fontSize="xs" color="gray.200">Sem pendências</Text>
        </Box>

        <Menu id="menu-avatar" isLazy>
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
