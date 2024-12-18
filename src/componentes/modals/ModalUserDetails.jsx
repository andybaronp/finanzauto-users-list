import { useState } from 'react';
import { generList, handleChangePrefix, prexixesList } from '../../utilis';

const ModalUserDetails = ({ selectedUser, closeModal, isEditing, handleEdit }) => {
  const [userData, setUserData] = useState({
    id: selectedUser.id || "",
    title: selectedUser.title || "",
    firstName: selectedUser.firstName || "",
    lastName: selectedUser.lastName || "",
    picture: selectedUser.picture || "",
    gender: selectedUser.gender || "",
    phone: selectedUser.phone || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async () => {
    const { email, id, ...rest } = userData
    handleEdit(rest, id);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 border-2">
        <h3 className="text-lg font-bold text-center mb-4">Detalle del Usuario {isEditing}</h3>
        <div className="space-y-2">
          {/* ID */}
          <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between gap-2'>
            <label className="font-semibold">ID:</label>
            <input
              type="text"
              defaultValue={selectedUser.id}
              readOnly
              className="border p-1 outline-none"
            />
          </div>
          <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between gap-2'>
            <label className="font-semibold    ">Título:</label>
            {isEditing ?
              <select
                name="title"
                value={userData.title}
                className="border p-1 outline-teal-600 w-48"
                onChange={handleChange}
              >
                {
                  prexixesList.map((title, index) => (
                    <option key={index} value={title}>{handleChangePrefix(title)}</option>
                  ))
                }
              </select>
              :
              <input
                name="title"
                readOnly
                type="text"
                value={userData.title}
                onChange={handleChange}
                className="border p-1 outline-teal-600"
              />
            }
          </div>
          <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between gap-2'>
            <label className="font-semibold">Nombre:</label>
            <input
              name="firstName"
              readOnly={!isEditing}
              type="text"
              value={userData.firstName}
              onChange={handleChange}
              className="border p-1 outline-teal-600"
            />
          </div>
          <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between gap-2'>
            <label className="font-semibold">Apellido:</label>
            <input
              name="lastName"
              readOnly={!isEditing}
              type="text"
              value={userData.lastName}
              onChange={handleChange}
              className="border p-1 outline-teal-600"
            />
          </div>
          <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between gap-2'>
            <label className="font-semibold">Imagen:</label>
            <input
              name="picture"
              readOnly={!isEditing}
              type="text"
              className="border p-1 outline-teal-600"
              value={userData.picture}
              onChange={handleChange}
            />
          </div>
          <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between gap-2'>

            <label className="font-semibold">Género:</label>
            {isEditing ?
              <select
                name="gender"
                value={userData.gender}
                className="border p-1 outline-teal-600 w-48"
                onChange={handleChange}
              >
                {
                  generList.map((title, index) => (
                    <option key={index} value={title}>{title}</option>
                  ))
                }
              </select>
              :
              <input
                name="gender"
                readOnly={!isEditing}
                type="text"
                value={userData.gender}
                onChange={handleChange}
                className="border p-1 outline-teal-600"
              />}
          </div>
          {/* email is forbidden to update  // API  */}
          <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between gap-2'>
            <label className="font-semibold">Correo Electrónico:</label>
            <input
              readOnly
              type="email"
              defaultValue={selectedUser.email || ''}
              className="border p-1 outline-none"
            />
          </div>


          <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between gap-2'>
            <label className="font-semibold">Teléfono:</label>
            <input
              name="phone"
              readOnly={!isEditing}
              type="text"
              value={userData.phone}
              onChange={handleChange}
              className="border p-1 outline-teal-600"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="mt-6 flex justify-center space-x-2">
          {isEditing && <button className="bg-black text-white px-4 py-2 rounded-md" onClick={handleSave}>
            Guardar
          </button>}
          <button
            onClick={closeModal}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalUserDetails
