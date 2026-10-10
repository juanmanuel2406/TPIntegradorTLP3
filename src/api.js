import axios from 'axios'

const BASE_URL = ''

async function request(url, opciones = {}) {
  const token = localStorage.getItem('token')
  const config = { url: `${BASE_URL}${url}`, method: opciones.method, ...opciones }
  if (token) {
    config.headers = { Authorization: `Bearer ${token}`, ...opciones.headers }
  }

  try {
    const respuesta = await axios(config)
    return respuesta.data
  } catch (error) {
    const mensaje =
      error.response?.data?.message ||
      error.message ||
      'Error de conexión con el servidor'
    const err = new Error(mensaje)
    err.status = error.response?.status
    throw err
  }
}

export const loginRequest = (datos) =>
  request('/usuarios/login', { method: 'POST', data: datos })

export const registrarUsuario = (datos) =>
  request('/usuarios', { method: 'POST', data: datos })

export const getCategorias = () =>
  request('/categorias')

export const crearCategoria = (descripcion) =>
  request('/categorias', { method: 'POST', data: { descripcion } })

export const actualizarCategoria = (categoria) =>
  request('/categorias', { method: 'PUT', data: categoria })

export const eliminarCategoria = (id) =>
  request(`/categorias/${id}`, { method: 'DELETE' })

export const getProductos = () =>
  request('/productos')

export const getProductosPorCategoria = (categoria) =>
  request(`/productos/${categoria}`)

export const crearProducto = (datos) =>
  request('/productos', { method: 'POST', data: datos })