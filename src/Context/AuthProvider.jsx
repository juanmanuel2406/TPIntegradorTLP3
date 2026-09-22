import { useState } from 'react'
import { loginRequest, registrarUsuario } from '../api'
import { AuthContext } from './AuthContext'

function decodificarToken(token) {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [usuario, setUsuario] = useState(() =>
    decodificarToken(localStorage.getItem('token'))
  )

  const iniciarSesion = async (datos) => {
    const resultado = await loginRequest(datos)
    if (resultado.login && resultado.token) {
      localStorage.setItem('token', resultado.token)
      setToken(resultado.token)
      setUsuario(decodificarToken(resultado.token))
    }
    return resultado
  }

  const registrar = async (datos) => registrarUsuario(datos)

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUsuario(null)
  }

  const esAdmin = usuario?.admin === 1

  return (
    <AuthContext.Provider
      value={{ token, usuario, esAdmin, iniciarSesion, registrar, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  )
}