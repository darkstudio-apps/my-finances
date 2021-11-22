export const summaryDefault = {
  deposit: "R$ 0,00",
  withdraw: "R$ 0,00",
  total: "R$ 0,00",
}

const statusDisplay: any = {
  deposit: "À receber",
  withdraw: "À pagar",
  overdue: "Vencido",
  paid: "Pago",
}

export const getStatusDisplay = (status: string) => {
  return statusDisplay[status]
}
