const colorStatus: any = {
  deposit: "orange.600",
  withdraw: "orange.600",
  overdue: "red.600",
  paid: "green.600",
}

export function getColorStatus(type: string) {
  const color = colorStatus[type]
  return color ? color : "gray.400"
}
