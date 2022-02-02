import { addDays, addMonths, addYears, isBefore, endOfMonth } from "date-fns"

export const dateAddDays = (date: string, daysAdd: number) => {
  const dateFuture = addDays(new Date(date), daysAdd)
  return dateFuture.toISOString()
}

export const dateAddMonths = (date: string, monthsAdd: number) => {
  const dateFuture = addMonths(new Date(date), monthsAdd)
  return dateFuture.toISOString()
}

export const dateAddYears = (date: string, yearsAdd: number) => {
  const dateFuture = addYears(new Date(date), yearsAdd)
  return dateFuture.toISOString()
}

export const dateIsBefore = (currentDate: string, futureDate: string) => {
  const _isBefore = isBefore(new Date(currentDate), new Date(futureDate))
  return _isBefore
}

export const parseToUTCandISO = (dateYearMonthDay: string, hourOffset?: "start" | "end"): string => {
  const [yearSplit, monthSplit, daySplit] = dateYearMonthDay.split("-")

  const year = Number(yearSplit)
  const month = Number(monthSplit) - 1
  const day = Number(daySplit)

  const hours = hourOffset === "start" ? 0 : 23
  const minutes = hourOffset === "start" ? 0 : 59
  const seconds = hourOffset === "start" ? 0 : 59

  return new Date(Date.UTC(year, month, day, hours, minutes, seconds)).toISOString()
}

export const endOfMonthInYearMonthDay = (dateYearMonthDay: string) => {
  // TODO: usar a função getObjYearMonthDay
  const [yearSplit, monthSplit, daySplit] = dateYearMonthDay.split("-")

  const yearParam = Number(yearSplit)
  const monthParam = Number(monthSplit) - 1
  const dayParam = Number(daySplit)

  const dateParam = new Date(yearParam, monthParam, dayParam)
  const dayEndOfMonth = endOfMonth(dateParam)

  const year = dayEndOfMonth.getFullYear()
  const month = dayEndOfMonth.getMonth() + 1
  const day = dayEndOfMonth.getDate()

  return `${year}-${month}-${day}`
}

export const parseYearMonthDay = (dateUTC: string) => {
  const { year, month, day } = getObjYearMonthDay(dateUTC)
  return `${year}-${month}-${day}`
}

export const parseDateBr = (dateUTC: string) => {
  const { year, month, day } = getObjYearMonthDay(dateUTC)
  return `${day}/${month}/${year}`
}

// TODO: Rever essa implementação

export const getObjYearMonthDay = (dateUTC?: string) => {
  // Quando a data e gerada (new Date()) ela n esta sendo levado em consideração o UTC
  const date = dateUTC ?
    new Date(dateUTC)
    : new Date() // Se da a data n for em UTC, isso tem que ser levado em consideração

  let year = String(date.getFullYear())

  let monthNumber = date.getMonth() + 1
  let month = (monthNumber < 10) ? `0${monthNumber}` : String(monthNumber)

  let dayNumber = date.getDate()
  let day = (dayNumber < 10) ? `0${dayNumber}` : String(dayNumber)

  return { year, month, day }
}
