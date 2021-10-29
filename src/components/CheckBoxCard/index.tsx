import { HStack, Text, Icon } from "@chakra-ui/react"
import { FiArrowUp, FiArrowDown } from "react-icons/fi"

export type CheckBoxTypeProps = "deposit" | "withdraw"

interface CheckBoxCardProps {
  label: string
  type: CheckBoxTypeProps
  checkedType?: CheckBoxTypeProps | null
  onClick?: (typeSelected: CheckBoxTypeProps) => void
}

const themes = {
  deposit: {
    iconSvg: FiArrowUp,
    color: "green.400",
    backgroundColor: "rgba(72, 187, 120, 0.2)",
  },
  withdraw: {
    iconSvg: FiArrowDown,
    color: "red.400",
    backgroundColor: "rgba(245, 101, 101, 0.2)",
  },
}

export function CheckBoxCard({ label, type, checkedType, onClick }: CheckBoxCardProps) {
  let backgroundColor = "initial"

  if (checkedType === type) {
    backgroundColor = themes[type].backgroundColor
  }

  const handleOnClick = () => {
    if (onClick) {
      onClick(type)
    }
  }

  return (
    <HStack
      alignItems="center"
      justifyContent="center"
      bg="gray.700"
      borderRadius="xl"
      padding={4}
      spacing={2}
      width="100%"
      border="solid 1px"
      borderColor="gray.600"
      backgroundColor={backgroundColor}
      onClick={handleOnClick}
      cursor="pointer"
    >
      <Text>{label}</Text>
      <Icon as={themes[type].iconSvg} w={6} h={6} color={themes[type].color} />
    </HStack>
  )
}
