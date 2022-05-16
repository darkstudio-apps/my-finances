import { useRouter } from "next/router"
import NextLink from "next/link"
import { Link, LinkProps } from "@chakra-ui/react"

interface IActiveLink extends LinkProps {
  href: string
  children: string
  shouldMatchExactHref?: boolean
}

export function ActiveLink({ href, children, shouldMatchExactHref = false, ...rest }: IActiveLink) {
  const { asPath } = useRouter()

  let isActive = false

  if (shouldMatchExactHref && (asPath === href || asPath === rest.as)) {
    isActive = true
  }

  if (!shouldMatchExactHref) {
    if ((asPath.startsWith(String(href))) || (asPath.startsWith(String(rest.as)))) {
      isActive = true
    }
  }

  return (
    <NextLink href={href} passHref>
      <Link
        fontSize="lg"
        opacity={isActive ? 1 : 0.7}
        color={isActive ? "blue.300" : "gray.50"}
        fontWeight={isActive ? "semibold" : "normal"}
        _hover={{ opacity: 1 }}
        {...rest}
      >
        {children}
      </Link>
    </NextLink>
  )
}
