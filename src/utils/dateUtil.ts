import { addDays, addMonths, addYears, isBefore, endOfMonth } from "date-fns"

export const generateDecimalNumberInString = (number: number): string => String(number).padStart(2, "0")

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

export const parseYearMonthDayUTC = (dateUTC: string) => {
  const { year, month, day } = getObjYearMonthDayUTC(dateUTC)
  return `${year}-${month}-${day}`
}

export const parseDateBrUTC = (dateUTC: string) => {
  const { year, month, day } = getObjYearMonthDayUTC(dateUTC)
  return `${day}/${month}/${year}`
}

export const parseToUTCandISO = (dateYearMonthDay: string, hourOffset?: "start" | "end"): string => {
  const { year, month, day } = getObjYearMonthDay(dateYearMonthDay)

  const yearNumber = Number(year)
  const monthNumber = Number(month) - 1
  const dayNumber = Number(day)

  let hours, minutes, seconds

  if (hourOffset === "start") {
    hours = 0
    minutes = 0
    seconds = 0
  }
  else if (hourOffset === "end") {
    hours = 23
    minutes = 59
    seconds = 59
  }
  else {
    const newDate = new Date()

    hours = newDate.getHours()
    minutes = newDate.getMinutes()
    seconds = newDate.getSeconds()
  }

  const dateMillisecondsUTC = Date.UTC(yearNumber, monthNumber, dayNumber, hours, minutes, seconds)

  const dateISOStringUTC = new Date(dateMillisecondsUTC).toISOString()

  return dateISOStringUTC
}

type IParseObjToUTCandISO = { day: string, month: string, year: string }
export const parseObjToUTCandISO = ({ day, month, year }: IParseObjToUTCandISO, hourOffset?: "start" | "end") => {
  const dateUTCandISO = parseToUTCandISO(`${year}-${month}-${day}`, hourOffset)
  return dateUTCandISO
}

export const endOfMonthInYearMonthDay = (dateYearMonthDay: string) => {
  const { year: yearSplit, month: monthSplit, day: daySplit } = getObjYearMonthDay(dateYearMonthDay)

  const yearParam = Number(yearSplit)
  const monthParam = Number(monthSplit) - 1
  const dayParam = Number(daySplit)

  const dateParam = new Date(yearParam, monthParam, dayParam, 0, 0, 0)
  const dayEndOfMonth = endOfMonth(dateParam)

  const year = dayEndOfMonth.getFullYear()
  const month = generateDecimalNumberInString(dayEndOfMonth.getMonth() + 1)
  const day = generateDecimalNumberInString(dayEndOfMonth.getDate())

  return `${year}-${month}-${day}`
}

export const dateNowYearMonthDay = () => {
  const date = new Date()

  const year = String(date.getFullYear())

  const monthNumber = date.getMonth() + 1
  const month = generateDecimalNumberInString(monthNumber)

  const dayNumber = date.getDate()
  const day = generateDecimalNumberInString(dayNumber)

  return `${year}-${month}-${day}`
}

export const getObjYearMonthDay = (dateYearMonthDay: string) => {
  const [yearSplit, monthSplit, daySplit] = dateYearMonthDay.split("-")

  const yearParam = Number(yearSplit)
  const monthNumber = Number(monthSplit)
  const dayNumber = Number(daySplit)

  const year = String(yearParam)
  const month = generateDecimalNumberInString(monthNumber)
  const day = generateDecimalNumberInString(dayNumber)

  return { year, month, day }
}

export const dateNowObj = () => {
  const date = new Date()

  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()

  return {month, day, year}
}

export const getObjYearMonthDayUTC = (dateUTC?: string) => {
  if (!dateUTC) return { year: "", month: "", day: "" }

  const date = new Date(dateUTC)

  const year = String(date.getUTCFullYear())

  const monthNumber = date.getUTCMonth() + 1
  const month = generateDecimalNumberInString(monthNumber)

  const dayNumber = date.getUTCDate()
  const day = generateDecimalNumberInString(dayNumber)

  return { year, month, day }
}
