export const formatCurrency = (amount: number) => {
  return new Intl
    .NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
    .format(amount)
}

export const onlyNumbers = (txt: string) => {
  const arrayNumbers = txt.match(/[0-9]/g)
  if (arrayNumbers === null) return ""
  else return arrayNumbers.join("")
}

export const formatFloat = (amount: string) => {
  return parseFloat(amount.replace(".", "").replace(",", "."))
}

export const formatReal = (amount: string | number) => {
  let tmp = onlyNumbers(String(amount)).replace(/([0-9]{2})$/g, ",$1")

  if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")
  if (tmp.length > 10) tmp = tmp.replace(/([0-9]{3})\.([0-9]{3}),([0-9]{2}$)/g, ".$1.$2,$3")

  if (tmp === "0" || tmp === "NaN") return "0,00"

  if (tmp.substring(0, 1) === ",") tmp = `0${tmp}`
  else if (tmp.length > 4 && tmp.substring(0, 1) === "0") tmp = tmp.substring(1)
  else if (tmp.length === 1) tmp = `0,0${tmp}`

  return tmp
}
