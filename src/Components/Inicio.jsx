import { useEffect, useState } from 'react'
import { getCategorias, getProductos, getProductosPorCategoria } from '../api'
import { useAuth } from '../Context/useAuth'
import ProductoNuevo from './ProductoNuevo'

function formatearPrecio(precio) {
  return Number(precio).toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  })
}

function Inicio() {
  const { esAdmin } = useAuth()
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [categoriaSel, setCategoriaSel] = useState('')
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [formularioVisible, setFormularioVisible] = useState(false)

  const cargarProductos = async (categoriaId) => {
    setError(null)
    setCargando(true)
    try {
      const data = categoriaId
        ? await getProductosPorCategoria(categoriaId)
        : await getProductos()
      setProductos(data)
    } catch (err) {
      if (err.status === 404) {
        // La categoría existe pero no tiene productos
        setProductos([])
      } else {
        setError(err.message)
      }
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    let activo = true
    Promise.all([getCategorias(), getProductos()])
      .then(([cats, prods]) => {
        if (!activo) return
        setCategorias(cats)
        setProductos(prods)
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

  useEffect(() => {
    console.log('Formulario de nuevo producto:', formularioVisible ? 'visible' : 'oculto')
  }, [formularioVisible])

  const handleCategoria = (e) => {
    const valor = e.target.value
    setCategoriaSel(valor)
    cargarProductos(valor)
  }

  return (
    <div className="w-full max-w-4xl animate-entrada">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
          Productos
        </h1>
        {esAdmin && (
          <button
            onClick={() => setFormularioVisible(!formularioVisible)}
            className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white font-semibold tracking-wide px-5 py-2.5 rounded-xl cursor-pointer shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 ease-out hover:-translate-y-1 active:scale-95"
          >
            {formularioVisible ? 'Ocultar Nuevo Producto' : '+ Nuevo Producto'}
          </button>
        )}
      </div>

      {formularioVisible && (
        <div className="mb-6 flex justify-center">
          <ProductoNuevo
            onCreado={() => {
              setFormularioVisible(false)
              cargarProductos()
            }}
          />
        </div>
      )}

      <div className="mb-6">
        <select
          value={categoriaSel}
          onChange={handleCategoria}
          className="w-full max-w-xs px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center font-semibold text-blue-700 bg-white"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.descripcion}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg py-2 px-4 mb-4">
          {error}
        </p>
      )}

      {cargando ? (
        <p className="text-lg font-semibold text-blue-700 animate-pulse">Cargando productos...</p>
      ) : productos.length === 0 ? (
        <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-2xl shadow-blue-500/40 px-10 py-8 text-center border border-blue-200/60">
          <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-fuchsia-500 to-blue-600 tracking-wide">
            No hay productos para mostrar.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productos.map((prod) => (
            <div
              key={prod.id}
              className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-2xl shadow-blue-500/40 px-8 py-6 border border-blue-200/60 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/70"
            >
              <h2 className="text-xl font-bold text-blue-700">{prod.descripcion}</h2>
              <p className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent mt-2">
                {formatearPrecio(prod.precio)}
              </p>
              <span className="inline-block mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                {prod.categoria}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Inicio