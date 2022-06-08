import React, { useContext, createContext, useState } from 'react'

export type AuthContextType = {
  isAuthenticated: boolean | undefined
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | undefined>>
}
const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>()

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
export default AuthContextProvider
