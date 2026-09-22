import { useEffect, useState } from 'react'
import {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
  getCategorias,
} from '../api'
import Boton from './Boton'

function Categorias() {
  const [categorias, setCategorias] = useState([])
  const [descripcion, setDescripcion] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [error, setError] = useState(null)
  const [exito, setExito] = useState(null)
  const [cargando, setCargando] = useState(true)

  const cargar = async () => {
    try {
      setCategorias(await getCategorias())
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    let activo = true
    getCategorias()
      .then((cats) => {
        if (!activo) return
        setCategorias(cats)
        setError(null)
      })
      .catch((err) => {
        if (activo) setError(err.message)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })
    return () => {
      activo = false
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setExito(null)
    try {
      if (editandoId !== null) {
        await actualizarCategoria({ id: editandoId, descripcion })
        setExito('Categoría actualizada correctamente.')
        setEditandoId(null)
      } else {
        await crearCategoria(descripcion)
        setExito('Categoría creada correctamente.')
      }
      setDescripcion('')
      await cargar()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEditar = (cat) => {
    setError(null)
    setExito(null)
    setEditandoId(cat.id)
    setDescripcion(cat.descripcion)
  }

  const handleEliminar = async (cat) => {
    if (!window.confirm(`¿Eliminar la categoría "${cat.descripcion}"?`)) return
    setError(null)
    setExito(null)
    try {
      await eliminarCategoria(cat.id)
      setExito('Categoría eliminada correctamente.')
      await cargar()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="w-full max-w-2xl animate-entrada">
      <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
        Gestión de Categorías
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-2xl shadow-blue-500/40 px-8 py-6 border border-blue-200/60 mb-6"
      >
        <div className="flex gap-3">
          <input
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción de la categoría"
            required
            className="flex-1 px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
          />
          <Boton
            label={editandoId !== null ? 'Guardar cambios' : 'Crear'}
            type="submit"
          />
        </div>
        {editandoId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditandoId(null)
              setDescripcion('')
            }}
            className="mt-3 font-semibold text-blue-700 underline hover:text-indigo-600 transition-colors duration-300 cursor-pointer"
          >
            Cancelar edición
          </button>
        )}
      </form>

      {error && (
        <p className="text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg py-2 px-4 mb-4">
          {error}
        </p>
      )}
      {exito && (
        <p className="text-green-700 font-semibold bg-green-50 border border-green-200 rounded-lg py-2 px-4 mb-4">
          {exito}
        </p>
      )}

      {cargando ? (
        <p className="text-lg font-semibold text-blue-700 animate-pulse text-center">
          Cargando categorías...
        </p>
      ) : categorias.length === 0 ? (
        <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-fuchsia-500 to-blue-600 tracking-wide text-center">
          Todavía no hay categorías.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {categorias.map((cat) => (
            <li
              key={cat.id}
              className="flex items-center justify-between bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-lg shadow-blue-500/30 px-6 py-4 border border-blue-200/60 transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="text-lg font-bold text-blue-700">{cat.descripcion}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditar(cat)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-4 py-2 rounded-xl cursor-pointer shadow-md shadow-amber-500/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(cat)}
                  className="bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold px-4 py-2 rounded-xl cursor-pointer shadow-md shadow-red-500/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Categorias