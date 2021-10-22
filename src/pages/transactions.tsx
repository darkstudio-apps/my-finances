import { Flex, SimpleGrid, Stack, Text, Heading, Icon } from "@chakra-ui/react"
import { CardTransaction } from "../components/CardTransaction"
import { TableTransaction } from "../components/TableTransaction"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"

export default function Transactions() {
  return (
    <Stack paddingY={10}>
      <SimpleGrid columns={3} spacing={10}>
        <CardTransaction
          description="Entradas"
          title="R$ 1.400,00"
          icon="arrowUp"
        />
        <CardTransaction
          description="Saídas"
          title="R$ 400,00"
          icon="arrowDown"
        />
        <CardTransaction
          description="Total"
          title="R$ 1.000,00"
          icon="dollarSign"
        />
      </SimpleGrid>
      <Stack paddingY={10}>
        <Table variant="simple" bg="gray.700" borderRadius="xl">
          <Thead>
            <Tr>
              <Th>Título</Th>
              <Th>Preço</Th>
              <Th>Categoria</Th>
              <Th>Data</Th>
            </Tr>
          </Thead>
          <Tbody>
            <TableTransaction
              title="Desenvolvimento de site"
              price="R$ 12.000,00"
              category="Venda"
              date="13/04/2021"
              isIncome={true}
            />
            <TableTransaction
              title="Hamburguer"
              price="R$ 59,00"
              category="Alimentação"
              date="10/04/2021"
              isIncome={false}
            />
            <TableTransaction
              title="Computador"
              price="R$ 5.400,00"
              category="Venda"
              date="01/04/2021"
              isIncome={true}
            />
            <TableTransaction
              title="Aluguel do Apartamento"
              price="R$ 1.200,00"
              category="Casa"
              date="05/04/2021"
              isIncome={false}
            />
          </Tbody>
          <Tfoot>
            <Tr>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </Stack>
    </Stack>
  )
}
