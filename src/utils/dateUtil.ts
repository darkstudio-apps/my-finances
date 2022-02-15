import { addDays, addMonths, addYears, isBefore, endOfMonth } from "date-fns"

const generateDecimalNumberInString = (number: number) => (number < 10) ? `0${number}` : String(number)

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

  let year = String(date.getFullYear())

  let monthNumber = date.getMonth() + 1
  let month = generateDecimalNumberInString(monthNumber)

  let dayNumber = date.getDate()
  let day = generateDecimalNumberInString(dayNumber)

  return `${year}-${month}-${day}`
}

export const getObjYearMonthDay = (dateYearMonthDay: string) => {
  const [yearSplit, monthSplit, daySplit] = dateYearMonthDay.split("-")

  const yearParam = Number(yearSplit)
  const monthNumber = Number(monthSplit)
  const dayNumber = Number(daySplit)

  let year = String(yearParam)
  let month = generateDecimalNumberInString(monthNumber)
  let day = generateDecimalNumberInString(dayNumber)

  return { year, month, day }
}

export const getObjYearMonthDayUTC = (dateUTC: string) => {
  const date = new Date(dateUTC)

  let year = String(date.getUTCFullYear())

  let monthNumber = date.getUTCMonth() + 1
  let month = generateDecimalNumberInString(monthNumber)

  let dayNumber = date.getUTCDate()
  let day = generateDecimalNumberInString(dayNumber)

  return { year, month, day }
}
