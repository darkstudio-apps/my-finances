import { Flex, Stack, Text, Heading, Icon } from "@chakra-ui/react"
import { FiArrowUp, FiArrowDown, FiDollarSign } from "react-icons/fi"

interface CardTransactionProps {
  description: string
  title: string
  icon?: "arrowUp" | "arrowDown" | "dollarSign"
}

const icons = {
  arrowUp: {
    icon: FiArrowUp,
    color: "green.400",
  },
  arrowDown: {
    icon: FiArrowDown,
    color: "red.400",
  },
  dollarSign: {
    icon: FiDollarSign,
    color: "white",
  },
}

export function CardTransaction({ description, title, icon }: CardTransactionProps) {
  return (
    <Stack bg="gray.700" borderRadius="xl" padding={6} spacing={2}>
      <Flex alignItems="center" justifyContent="space-between">
        <Text>{description}</Text>
        {icon && (
          <Icon as={icons[icon].icon} w={6} h={6} color={icons[icon].color} />
        )}
      </Flex>

      <Heading>{title}</Heading>
    </Stack>
  )
}
