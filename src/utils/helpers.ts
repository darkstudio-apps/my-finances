import { useBreakpointValue } from "@chakra-ui/react"

export function useIsDesktopMode() {
  const isDesktopMode = useBreakpointValue({
    base: false,
    md: true,
  })

  return isDesktopMode
}
