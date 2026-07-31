import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(null)
const STORAGE_KEY = "efm_auth_user"
const TOKEN_STORAGE_KEY = "efm_auth_token"

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

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
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY))

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token)
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
    }
  }, [token])

  async function loginWithCredentials(email, password) {
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      throw new Error("Correo o contraseña incorrectos.")
    }

    setToken("local-admin")
    setUser({
      id: "local-admin",
      name: "Administrador",
      email,
      role: "admin",
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
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, token, loginWithCredentials, loginWithGoogle, logout }}
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
