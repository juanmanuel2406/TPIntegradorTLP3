import { Link } from 'react-router-dom'
import { useAuth } from '../Context/useAuth'

function Navbar() {
  const { usuario, esAdmin, cerrarSesion } = useAuth()

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 shadow-lg shadow-blue-500/30 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <ul className="flex items-center gap-6">
          <li>
            <Link
              to="/"
              className="text-white font-semibold tracking-wide transition-colors duration-300 hover:text-blue-200"
            >
              Productos
            </Link>
          </li>
          {esAdmin && (
            <>
              <li>
                <Link
                  to="/categorias"
                  className="text-white font-semibold tracking-wide transition-colors duration-300 hover:text-blue-200"
                >
                  Categorías
                </Link>
              </li>
              <li>
                <Link
                  to="/productos/nuevo"
                  className="text-white font-semibold tracking-wide transition-colors duration-300 hover:text-blue-200"
                >
                  Nuevo Producto
                </Link>
              </li>
            </>
          )}
        </ul>
        <ul className="flex items-center gap-6">
          {usuario ? (
            <>
              <li className="text-blue-100 font-semibold tracking-wide">
                ¡Hola, {usuario.nombre}!
              </li>
              <li>
                <button
                  onClick={cerrarSesion}
                  className="text-white font-semibold tracking-wide transition-colors duration-300 hover:text-blue-200 cursor-pointer"
                >
                  Salir
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-white font-semibold tracking-wide transition-colors duration-300 hover:text-blue-200"
                >
                  Ingresar
                </Link>
              </li>
              <li>
                <Link
                  to="/registro"
                  className="text-white font-semibold tracking-wide transition-colors duration-300 hover:text-blue-200"
                >
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar