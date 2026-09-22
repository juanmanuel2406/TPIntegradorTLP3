import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { crearProducto, getCategorias } from '../api'
import Boton from './Boton'

function ProductoNuevo() {
  const navigate = useNavigate()
  const [categorias, setCategorias] = useState([])
  const [form, setForm] = useState({ descripcion: '', precio: '', categoria: '' })
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    getCategorias()
      .then(setCategorias)
      .catch((err) => setError(err.message))
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setCargando(true)
    try {
      await crearProducto({
        descripcion: form.descripcion,
        precio: Number(form.precio),
        categoria: Number(form.categoria),
      })
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-2xl shadow-blue-500/40 px-10 py-8 border border-blue-200/60 animate-entrada transition-all duration-300 hover:scale-105 hover:shadow-blue-500/70">
      <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
        Nuevo Producto
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción (mín. 3 caracteres)"
          minLength={3}
          maxLength={15}
          required
          className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        />
        <input
          name="precio"
          type="number"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio (mín. 100)"
          min={100}
          required
          className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        />
        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center font-semibold text-blue-700 bg-white"
        >
          <option value="">Seleccioná una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.descripcion}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg py-2">
            {error}
          </p>
        )}

        <Boton label={cargando ? 'Creando...' : 'Crear Producto'} type="submit" disabled={cargando} />
      </form>
    </div>
  )
}

export default ProductoNuevo