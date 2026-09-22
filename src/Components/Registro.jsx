import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/useAuth'
import Boton from './Boton'

function Registro() {
  const navigate = useNavigate()
  const { registrar } = useAuth()
  const [form, setForm] = useState({ nombre: '', usuario: '', pass: '', admin: false })
  const [error, setError] = useState(null)
  const [exito, setExito] = useState(null)
  const [cargando, setCargando] = useState(false)

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setExito(null)
    setCargando(true)
    try {
      await registrar({
        nombre: form.nombre,
        usuario: form.usuario,
        pass: form.pass,
        admin: form.admin ? 1 : 0,
      })
      setExito('Usuario creado correctamente. Ya podés iniciar sesión.')
      setForm({ nombre: '', usuario: '', pass: '', admin: false })
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-2xl shadow-blue-500/40 px-10 py-8 text-center border border-blue-200/60 animate-entrada transition-all duration-300 hover:scale-105 hover:shadow-blue-500/70">
      <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
        Crear Cuenta
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        />
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
        <label className="flex items-center justify-center gap-2 font-semibold text-blue-700 cursor-pointer">
          <input
            name="admin"
            type="checkbox"
            checked={form.admin}
            onChange={handleChange}
            className="w-5 h-5 accent-blue-600"
          />
          Registrarme como administrador
        </label>

        {error && (
          <p className="text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg py-2">
            {error}
          </p>
        )}
        {exito && (
          <p className="text-green-700 font-semibold bg-green-50 border border-green-200 rounded-lg py-2">
            {exito}
          </p>
        )}

        <Boton label={cargando ? 'Registrando...' : 'Registrarse'} type="submit" disabled={cargando} />
      </form>

      {exito && (
        <button
          onClick={() => navigate('/login')}
          className="mt-4 font-semibold text-blue-700 underline hover:text-indigo-600 transition-colors duration-300 cursor-pointer"
        >
          Ir al login
        </button>
      )}
    </div>
  )
}

export default Registro