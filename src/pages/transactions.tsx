import { Flex, SimpleGrid, Stack, Text, Heading, Icon } from "@chakra-ui/react"
import { FiArrowUp, FiArrowDown, FiDollarSign } from "react-icons/fi"
import { CardTransaction } from "../components/CardTransaction"

export default function Transactions() {
  return (
    <Stack paddingY={10}>
      <SimpleGrid columns={3} spacing={10}>
        <CardTransaction description="Entradas" title="R$ 1.400,00" icon="arrowUp" />
        <CardTransaction description="Saídas" title="R$ 400,00" icon="arrowDown" />
        <CardTransaction description="Total" title="R$ 1.000,00" icon="dollarSign" />
      </SimpleGrid>

      {/* TABLE */}
    </Stack>
  )
}
