import { signOut, useSession } from "next-auth/react"
import {
  Avatar,
  Tag,
  Box,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Stack,
} from "@chakra-ui/react"
import { useIsDesktopMode } from "utils/helpers"
import packageJson from "../../../package.json"

const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV
const APP_VERSION = packageJson.version

export function Header() {
  const { data: session } = useSession()

  const userName = session?.user?.name || ""
  const userImage = session?.user?.image || ""

  const isDesktopMode = useIsDesktopMode()

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      paddingY={isDesktopMode ? 8 : 4}
    >
      <HStack spacing={4}>
        <Image src="./icons/money-with-wings.svg" alt="money" />

        <Stack
          align={isDesktopMode ? "center" : "flex-start"}
          spacing={isDesktopMode ? 4 : 1}
          direction={isDesktopMode ? "row" : "column"}
        >
          <Heading size={isDesktopMode ? "lg" : "md"} color="gray.200">
            My Finances
          </Heading>

          <Tag size="sm" css={!isDesktopMode && "font-size: 8px;"}>
            {
              VERCEL_ENV === "production"
                ? `v${APP_VERSION} Beta`
                : VERCEL_ENV === "preview"
                  ? `Homolog | v${APP_VERSION} Beta`
                  : `Develop | v${APP_VERSION} Beta`
            }
          </Tag>
        </Stack>
      </HStack>

      <HStack spacing={4}>
        <Box display={["none", "block"]}>
          <Heading fontSize="xl" fontWeight="semibold" color="gray.200">
            {userName}
          </Heading>
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
