import React, { useContext } from 'react'

type AuthContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}
const AuthContext = React.createContext<AuthContextType | null>(null)

const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
export default AuthContextProvider
