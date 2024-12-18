const ModalConfirmation = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold">Confirmación</h3>
        <p className="mt-4">{message}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded-md">Cancelar</button>
          <button onClick={onConfirm} className="bg-blue-500 text-white px-4 py-2 rounded-md">Confirmar</button>
        </div>
      </div>
    </div>
  )
}
export default ModalConfirmation
