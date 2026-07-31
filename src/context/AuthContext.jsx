import { createContext, useContext, useEffect, useState } from "react"

import { apiFetch } from "@/lib/api"
import { decodeJwtPayload } from "@/lib/jwt"

const AuthContext = createContext(null)
const STORAGE_KEY = "efm_auth_user"
const TOKEN_STORAGE_KEY = "efm_auth_token"

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
    const response = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ correo: email, password }),
    })

    const payload = decodeJwtPayload(response.token)

    setToken(response.token)
    setUser({
      id: response.usuario.id,
      name: response.usuario.nombreCompleto,
      email: response.usuario.correo,
      role: response.usuario.rol ?? payload?.rol ?? null,
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
