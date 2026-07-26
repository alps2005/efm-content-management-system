import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(null)
const STORAGE_KEY = "efm_auth_user"

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser())

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  async function loginWithCredentials(email, password) {
    const validEmail = import.meta.env.VITE_ADMIN_EMAIL
    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD

    if (email !== validEmail || password !== validPassword) {
      throw new Error("Credenciales incorrectas.")
    }

    setUser({
      name: "Administrador",
      email,
      avatar: "",
      provider: "local",
    })
  }

  function loginWithGoogle(profile) {
    setUser({
      name: profile.name,
      email: profile.email,
      avatar: profile.picture ?? "",
      provider: "google",
    })
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, loginWithCredentials, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
