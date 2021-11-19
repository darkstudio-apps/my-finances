import { Stack } from "@chakra-ui/react"

export function NoContentTableTransaction() {
  return (
    <Stack align="center" justify="center" spacing={3} py={20}>
      <h1>Você não possui nenhuma transação cadastrada!</h1>
      <h1>Cadastre uma transação clicando no botão acima.</h1>
    </Stack>
  )
}
