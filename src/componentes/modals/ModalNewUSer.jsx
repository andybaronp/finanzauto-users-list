import { useState } from 'react';
import { generList, handleChangePrefix, prexixesList } from '../../utilis';
const ModalNewUSer = ({ closeModal, handleSave }) => {



  const [userData, setUserData] = useState({
    title: prexixesList[0],
    firstName: '',
    lastName: '',
    picture: '',
    gender: generList[0],
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const validateField = (name, value) => {
    if (name === 'email') {
      if (!value) {
        return 'El correo electrónico es requerido';
      }
      if (value.length < 4) {
        return 'El correo electrónico debe tener al menos 4 caracteres';
      }
      if (!/\S+@\S+\.\S+/.test(value)) {
        return 'Ingrese un correo electrónico válido';
      }
    } else if (name === 'firstName' || name === 'lastName') {
      if (!value) {
        return `El ${name === 'firstName' ? 'nombre' : 'apellido'} es requerido`;
      }
      if (value.length < 4) {
        return `El ${name === 'firstName' ? 'nombre' : 'apellido'} debe tener al menos 4 caracteres`;
      }
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    // Validate field on change
    if (['firstName', 'lastName', 'email'].includes(name)) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      firstName: validateField('firstName', userData.firstName),
      lastName: validateField('lastName', userData.lastName),
      email: validateField('email', userData.email),
    };

    setErrors(newErrors);

    // Check if there are any errors
    return !Object.values(newErrors).some(error => error);
  };

  const saveData = () => {
    if (validateForm()) {
      handleSave(userData);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 border-2">
        <h3 className="text-lg font-bold text-center mb-4">Nuevo Usuario</h3>
        <div className="space-y-2">
          <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between gap-2'>
            <label className="font-semibold">Título:</label>
            <select
              name="title"
              value={userData.title}
              className="border p-1 outline-teal-600 w-48"
              onChange={handleChange}
            >
              {prexixesList.map((title, index) => (
                <option key={index} value={title}>{handleChangePrefix(title)}</option>
              ))}
            </select>
          </div>
          <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between gap-2'>
            <label className="font-semibold">Nombre: *</label>
            <div className="flex flex-col">
              <input
                name="firstName"
                type="text"
                value={userData.firstName}
                onChange={handleChange}
                className={`border p-1 outline-teal-600 ${errors.firstName ? 'border-red-500' : ''}`}
              />
              {errors.firstName && <span className="text-red-500 text-sm mt-1">{errors.firstName}</span>}
            </div>
          </div>
          <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between gap-2'>
            <label className="font-semibold">Apellido: *</label>
            <div className="flex flex-col">
              <input
                name="lastName"
                type="text"
                value={userData.lastName}
                onChange={handleChange}
                className={`border p-1 outline-teal-600 ${errors.lastName ? 'border-red-500' : ''}`}
              />
              {errors.lastName && <span className="text-red-500 text-sm mt-1">{errors.lastName}</span>}
            </div>
          </div>
          <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between gap-2'>
            <label className="font-semibold">Imagen:</label>
            <input
              name="picture"
              type="text"
              className="border p-1 outline-teal-600"
              value={userData.picture}
              onChange={handleChange}
            />
          </div>
          <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between gap-2'>
            <label className="font-semibold">Género:</label>
            <select
              name="gender"
              value={userData.gender}
              className="border p-1 outline-teal-600 w-48"
              onChange={handleChange}
            >
              {generList.map((gender, index) => (
                <option key={index} value={gender}>{gender}</option>
              ))}
            </select>
          </div>
          <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between gap-2'>
            <label className="font-semibold">Correo Electrónico: *</label>
            <div className="flex flex-col">
              <input
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                className={`border p-1 outline-teal-600 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
            </div>
          </div>
          <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between gap-2'>
            <label className="font-semibold">Teléfono:</label>
            <input
              name="phone"
              type="text"
              value={userData.phone}
              onChange={handleChange}
              className="border p-1 outline-teal-600"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center space-x-2">
          <button className="bg-black text-white px-4 py-2 rounded-md" onClick={saveData}>
            Guardar
          </button>
          <button
            onClick={closeModal}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalNewUSer;