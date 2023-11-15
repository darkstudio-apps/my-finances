import { Flex, Stack, Text, Heading } from "@chakra-ui/react"
import { Icon, IconName } from "components"

interface ICardTransaction {
  description: string
  title: string
  icon?: IconName
}

export function CardTransaction({ description, title, icon }: ICardTransaction) {
  return (
    <Stack bg="gray.700" borderRadius="xl" padding={6} spacing={2}>
      <Flex alignItems="center" justifyContent="space-between">
        <Text>{description}</Text>

        {icon && (
          <Icon name={icon} />
        )}
      </Flex>

      <Heading>{title}</Heading>
    </Stack>
  )
}
