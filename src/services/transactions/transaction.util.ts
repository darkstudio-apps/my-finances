const statusDisplayObj: any = {
  deposit: "À receber",
  withdraw: "À pagar",
  overdue: "Vencido",
  paid: "Pago",
}

export function getStatusDisplay(status: string) {
  const statusDisplay = statusDisplayObj[status]
  return statusDisplay
}
