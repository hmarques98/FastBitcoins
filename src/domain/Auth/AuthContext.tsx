import React, { useContext, createContext, useState } from 'react'

type AuthContextType = {
  isAuthenticated: boolean
  setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>
}
const AuthContext = createContext<AuthContextType | null>(null)

const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
export default AuthContextProvider
