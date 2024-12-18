import { handleChangePrefix } from "../utilis"
import userImagePlaceholder from '../assets/user-placeholder.png'
import { useState } from "react";
import ModalUserDetails from "./modals/ModalUserDetails";
import { get } from "../api/api";
import ModalError from "./modals/ModalError";

const UserList = ({ user }) => {
  const { id, title, firstName, lastName, picture } = user
  const [loading, setLoading] = useState(false);
  //user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  //error
  const [error, setError] = useState(null);
  const [isModalOpenError, setIsModalOpenError] = useState(false);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const getUserById = async (id) => {
    setLoading(true)
    try {
      const res = await get(`user/${id}`)
      if (res.error) {
        setIsModalOpenError(true)
        setError(`Error al obtener el usuario `)
        return
      }
      openModal(res)
    } catch (error) {
      //TODO  enviar error a log
      console.log(error);
      setIsModalOpenError(true)
      setError(`Error al obtener el usuario`)
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div className="mb-2 sm:mb-0 w-full sm:w-1/4">
        <p className="text-gray-800 font-semibold">{id}</p>
      </div>
      <div className="mb-2 sm:mb-0 w-full sm:w-1/4">
        <p className="text-gray-800">
          {handleChangePrefix(title)} {firstName} {lastName}
        </p>
      </div>

      {/* Image */}
      <div className="w-full sm:w-1/4 flex justify-center">
        <img
          src={picture || userImagePlaceholder}
          alt={`${firstName} ${lastName}`}
          className="w-12 h-12 rounded-full"
        />
      </div>

      {/* Actions */}
      <div className="w-full sm:w-1/4 flex justify-center space-x-2 mt-2 sm:mt-0">
        <button className="text-gray-500 hover:text-red-600" onClick={() => getUserById(user.id)} disabled={loading}>🧑🏻‍💻</button>
        <button className="text-gray-500 hover:text-black" disabled={loading}>📝</button>
        <button className="text-gray-500 hover:text-red-600" disabled={loading}>🗑</button>
      </div>
      {
        isModalOpen && (
          <ModalUserDetails selectedUser={selectedUser} closeModal={closeModal} />
        )
      }
      {
        isModalOpenError && (
          <ModalError error={error} onClose={() => setIsModalOpenError(false)} />
        )

      }
    </>
  )
}
export default UserList