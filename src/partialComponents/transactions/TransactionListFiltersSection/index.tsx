import { Button, Select, Spinner, HStack } from "@chakra-ui/react"
import { useTransactions } from "contexts/transactions"
import { useIsDesktopMode } from "utils/helpers"

export function TransactionListFiltersSection() {
  const isDesktopMode = useIsDesktopMode()

  const {
    transactions,
    filters,
    setFilters,
    handleModalTransactionForm,
  } = useTransactions()

  const handleChangeFilters = (name: string, value: string) => {
    setFilters(old => ({
      ...old,
      [name]: value,
    }))
  }

  const handleOpenNewTransaction = () => {
    handleModalTransactionForm({
      isOpen: true,
      editMode: false,
      dataToEdit: null,
    })
  }

  return (
    <HStack align="center" justify="space-between" spacing={4}>
      <HStack spacing={4}>
        <Select
          fontSize="sm"
          name="month"
          placeholder="Selecione o mês"
          value={filters.month}
          onChange={({ target: { name, value } }) => handleChangeFilters(name, value)}
        >
          <option value="01">Janeiro</option>
          <option value="02">Fevereiro</option>
          <option value="03">Março</option>
          <option value="04">Abril</option>
          <option value="05">Maio</option>
          <option value="06">Junho</option>
          <option value="07">Julho</option>
          <option value="08">Agosto</option>
          <option value="09">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>
        </Select>

        <Select
          maxWidth={["90px", "initial"]}
          fontSize="sm"
          name="year"
          placeholder="Selecione o ano"
          value={filters.year}
          onChange={({ target: { name, value } }) => handleChangeFilters(name, value)}
        >
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
        </Select>
      </HStack>

      <HStack spacing={4}>
        {transactions.isFetching && (
          <Spinner />
        )}

        <Button
          width={["90px", "180px", "180px", "180px"]}
          fontSize="sm"
          onClick={handleOpenNewTransaction}
          borderRadius="md"
          colorScheme="green"
          paddingX={10}
        >
          {isDesktopMode ? "Nova Transação" : "Cadastrar"}
        </Button>
      </HStack>
    </HStack>
  )
}
