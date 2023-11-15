import { IconType } from "react-icons"
import { FiArrowUp, FiArrowDown, FiDollarSign } from "react-icons/fi"
import { Icon as IconChakra } from "@chakra-ui/react"

export type IconName = "arrowUp" | "arrowDown" | "dollarSign"

export interface IIcon {
  name: IconName
  width?: number | string
  height?: number | string
}

const icons: Record<IconName, { icon: IconType, color: string }> = {
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

export function Icon({ name, width = 6, height = 6 }: IIcon) {
  return (
    <IconChakra
      as={icons[name].icon}
      color={icons[name].color}
      width={width}
      height={height}
    />
  )
}
