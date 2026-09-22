function Boton({ label, onClick, type = 'button', disabled }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="relative overflow-hidden group bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white font-semibold text-lg tracking-wide px-6 py-3 rounded-xl cursor-pointer shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 ease-out hover:-translate-y-1 active:translate-y-0 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-400/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
    >
      {label}
    </button>
  )
}

export default Boton