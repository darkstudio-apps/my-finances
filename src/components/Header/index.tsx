import { signOut, useSession } from "next-auth/react"
import { Avatar, Tag, Box, Flex, Heading, HStack, Text, Menu, MenuButton, MenuList, MenuItem, Image } from "@chakra-ui/react"
// import { ActiveLink } from "./ActiveLink"
import packageJson from "../../../package.json"

const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV
const APP_VERSION = packageJson.version

export function Header() {
  const { data: session } = useSession()

  const userName = session?.user?.name || ""
  const userImage = session?.user?.image || ""

  return (
    <Flex as="header" align="center" justify="space-between" paddingY={8}>
      <HStack spacing={4}>
        <Image src="./icons/money-with-wings.svg" alt="money" />
        <Heading size="lg" color="gray.200">My Finances</Heading>
        <Tag size="sm">
          {
            VERCEL_ENV === "production"
              ? `v${APP_VERSION} Beta`
              : VERCEL_ENV === "preview"
                ? `Homolog | v${APP_VERSION} Beta`
                : `Develop | v${APP_VERSION} Beta`
          }
        </Tag>
      </HStack>

      <HStack as="nav" spacing={8}>
        {/* <ActiveLink href="/transactions">Transações</ActiveLink> */}
        {/* <ActiveLink href="/lists">Listas</ActiveLink> */}
      </HStack>

      <HStack spacing={4}>
        <Box display={["none", "block"]}>
          <Heading fontSize="xl" fontWeight="semibold" color="gray.200">
            {userName}
          </Heading>

          <Text fontSize="xs" color="gray.200">Sem pendências</Text>
        </Box>

        <Menu id="menu-avatar" isLazy>
          <MenuButton>
            <Avatar
              width={["40px", "48px"]}
              height={["40px", "48px"]}
              name={userName}
              src={userImage}
            />
          </MenuButton>

          <MenuList>
            <MenuItem onClick={() => signOut()}>
              Sair
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  )
}
