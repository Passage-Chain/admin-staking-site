import { useCallback, useState } from 'react'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        return JSON.parse(item)
      }
      window.localStorage.setItem(key, JSON.stringify(initialValue))
      return initialValue
    } catch (error) {
      console.warn(error)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T) => {
      if (typeof window === 'undefined') {
        return
      }
      try {
        setStoredValue(value)
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.warn(error)
      }
    },
    [key],
  )

  return [storedValue, setValue] as const
}
