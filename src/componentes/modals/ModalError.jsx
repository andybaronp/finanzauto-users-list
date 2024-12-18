const ModalError = ({ error, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-red-400">
        <h3 className="text-xl font-bold text-red-400">Error</h3>
        <p className="mt-4">{error}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-md">Cerrar</button>
        </div>
      </div>
    </div>
  )
}
export default ModalError
