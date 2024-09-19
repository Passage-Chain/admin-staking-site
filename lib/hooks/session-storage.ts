import { useCallback, useState } from 'react'

export const useSessionStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.sessionStorage.getItem(key)
      if (item) {
        return JSON.parse(item)
      }
      window.sessionStorage.setItem(key, JSON.stringify(initialValue))
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
        window.sessionStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.warn(error)
      }
    },
    [key],
  )

  return [storedValue, setValue] as const
}
