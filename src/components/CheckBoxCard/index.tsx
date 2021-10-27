import { HStack, Text, Icon } from "@chakra-ui/react"
import { FiArrowUp, FiArrowDown } from "react-icons/fi"

interface CheckBoxCardProps {
  label: string
  icon?: "arrowUp" | "arrowDown"
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
}

export function CheckBoxCard({ label, icon }: CheckBoxCardProps) {
  return (
    <HStack
      alignItems="center"
      justifyContent="center"
      bg="gray.700"
      borderRadius="xl"
      padding={6}
      spacing={2}
      width="100%"
      border="solid 1px"
      borderColor="gray.500"
    >
      <Text>{label}</Text>
      {icon && (
        <Icon as={icons[icon].icon} w={6} h={6} color={icons[icon].color} />
      )}
    </HStack>
  )
}
