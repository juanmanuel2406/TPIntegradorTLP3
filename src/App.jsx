import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Inicio from './Components/Inicio'
import Login from './Components/Login'
import Registro from './Components/Registro'
import Categorias from './Components/Categorias'
import { useAuth } from './Context/useAuth'

function RequireAdmin({ children }) {
  const { esAdmin } = useAuth()
  if (!esAdmin) return <Navigate to="/login" replace />
  return children
}

function App() {
  return (
    <>
      <Navbar />
      <div className="p-8 flex justify-center">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/categorias"
            element={
              <RequireAdmin>
                <Categorias />
              </RequireAdmin>
            }
          />
        </Routes>
      </div>
    </>
  )
}

export default App