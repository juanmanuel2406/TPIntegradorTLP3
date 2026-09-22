import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/useAuth'
import Boton from './Boton'

function Login() {
  const navigate = useNavigate()
  const { iniciarSesion } = useAuth()
  const [form, setForm] = useState({ usuario: '', pass: '' })
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setCargando(true)
    try {
      await iniciarSesion(form)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-2xl shadow-blue-500/40 px-10 py-8 text-center border border-blue-200/60 animate-entrada transition-all duration-300 hover:scale-105 hover:shadow-blue-500/70">
      <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
        Iniciar Sesión
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="usuario"
          value={form.usuario}
          onChange={handleChange}
          placeholder="Usuario"
          required
          className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        />
        <input
          name="pass"
          type="password"
          value={form.pass}
          onChange={handleChange}
          placeholder="Contraseña"
          required
          className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        />

        {error && (
          <p className="text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg py-2">
            {error}
          </p>
        )}

        <Boton label={cargando ? 'Ingresando...' : 'Ingresar'} type="submit" disabled={cargando} />
      </form>

      <p className="mt-4 font-semibold text-blue-700">
        ¿No tenés cuenta?{' '}
        <Link to="/registro" className="underline hover:text-indigo-600 transition-colors duration-300">
          Registrate
        </Link>
      </p>
    </div>
  )
}

export default Login