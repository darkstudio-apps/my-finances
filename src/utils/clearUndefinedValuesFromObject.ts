export function clearUndefinedValuesFromObject<T>(object: T): T {
  const entries = Object.entries(object)

  const filteredEntries = entries.reduce<[string, any][]>((acc, [key, value]) => {
    if (value === undefined) return acc

    if (typeof value === "object") {
      const obj = clearUndefinedValuesFromObject({ ...value })

      if (Object.keys(obj).length > 0) {
        return [...acc, [key, obj]]
      }

      return acc
    }

    return [...acc, [key, value]]
  }, [])

  return Object.fromEntries(filteredEntries) as T
}
