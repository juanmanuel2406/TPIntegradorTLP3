const BASE_URL = ''

async function request(url, opciones = {}) {
  const token = localStorage.getItem('token')
  const headers = { 'Content-Type': 'application/json', ...opciones.headers }
  if (token) headers.Authorization = `Bearer ${token}`

  const respuesta = await fetch(`${BASE_URL}${url}`, { ...opciones, headers })
  const data = await respuesta.json().catch(() => ({}))

  if (!respuesta.ok) {
    const error = new Error(data.message || 'Error de conexión con el servidor')
    error.status = respuesta.status
    throw error
  }
  return data
}

export const loginRequest = (datos) =>
  request('/usuarios/login', { method: 'POST', body: JSON.stringify(datos) })

export const registrarUsuario = (datos) =>
  request('/usuarios', { method: 'POST', body: JSON.stringify(datos) })

export const getCategorias = () =>
  request('/categorias')

export const crearCategoria = (descripcion) =>
  request('/categorias', { method: 'POST', body: JSON.stringify({ descripcion }) })

export const actualizarCategoria = (categoria) =>
  request('/categorias', { method: 'PUT', body: JSON.stringify(categoria) })

export const eliminarCategoria = (id) =>
  request(`/categorias/${id}`, { method: 'DELETE' })

export const getProductos = () =>
  request('/productos')

export const getProductosPorCategoria = (categoria) =>
  request(`/productos/${categoria}`)

export const crearProducto = (datos) =>
  request('/productos', { method: 'POST', body: JSON.stringify(datos) })