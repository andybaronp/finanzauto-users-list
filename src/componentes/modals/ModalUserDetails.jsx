import userImagePlaceholder from '../../assets/user-placeholder.png'
import { formatDate } from '../../utilis'

const ModalUserDetails = ({ selectedUser, closeModal }) => {

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold">Detalles del Usuario</h3>
        <div className="mt-4 space-y-2">
          <div className='flex justify-center  items-center'>
            <img src={selectedUser.picture || userImagePlaceholder} className="w-24 h-24 rounded-full" alt={selectedUser.firstName} />
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>ID:</p>
            <p  >{selectedUser.id}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Título:</p>
            <p  >{selectedUser.title}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Nombre:</p>
            <p  >{selectedUser.firstName}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Apellido:</p>
            <p  >{selectedUser.lastName}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Genero:</p>
            <p  >{selectedUser.gender || 'N/A'}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Email:</p>
            <p  >{selectedUser.email}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Fecha de nacimiento:</p>
            <p  >{selectedUser.birthDate || 'N/A'}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Teléfono:</p>
            <p  >{selectedUser.phone || 'N/A'}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Fecha de registro:</p>
            <p  >{selectedUser.registerDate ? formatDate(selectedUser.registerDate) : 'N/A'}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Ultima actualización:</p>
            <p >{selectedUser.lastUpdate ? formatDate(selectedUser.lastUpdate) : 'N/A'}</p>
          </div>

        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded-md">Cerrar</button>
        </div>
      </div>
    </div>
  )
}
export default ModalUserDetails

