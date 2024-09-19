import { ReactNode, createContext, useContext, useEffect } from 'react'

import _ from 'lodash'

const EnvVars = {
  development: process.env.NODE_ENV === 'development',
  vaultFactoryAddress: process.env.NEXT_PUBLIC_VAULT_FACTORY_ADDRESS as string,
}

const EnvVarsContext = createContext(EnvVars)

export const EnvVarsProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const undefinedValues = _.some(_.values(EnvVars), (v) => v === undefined)

    if (undefinedValues) {
      throw new Error(
        `Missing environment variables: ${JSON.stringify(EnvVars)}`,
      )
    }
  }, [])

  return (
    <EnvVarsContext.Provider value={EnvVars}>
      {children}
    </EnvVarsContext.Provider>
  )
}

export const useEnvVars = () => {
  return useContext(EnvVarsContext)
}
