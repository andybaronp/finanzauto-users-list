import { handleChangePrefix } from "../utilis"
import userImagePlaceholder from '../assets/user-placeholder.png'
import { useState } from "react";
import ModalUserDetails from "./modals/ModalUserDetails";
import { deleleteApi, getApi, putApi } from "../api/api";
import ModalError from "./modals/ModalError";
import ModalConfirmation from "./modals/ModalConfirmation";
import ModalLoading from "./modals/ModalLoading";

const UserList = ({ user, fetchUsers, }) => {
  const { id, title, firstName, lastName, picture } = user
  const [loading, setLoading] = useState(false);
  //user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  //error
  const [error, setError] = useState(null);
  const [isModalOpenError, setIsModalOpenError] = useState(false);
  // Delete
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  // Edit
  const [isEditing, setIsEditing] = useState(false);
  const showMOdalEdit = (id) => {
    if (selectedUser) {
      setIsEditing(true)
      setSelectedUser(selectedUser);
      setIsModalOpen(true);
    } else {
      setIsEditing(true)
      getUserById(id)
    }

  }

  const handleDeleteConfirmation = () => {
    handleDelete()
  };
  const openModalViewUser = (user) => {

    setSelectedUser(user);
    setIsModalOpen(true);

  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setSelectedUser(null);
  };

  const getUserById = async (id) => {
    setLoading(true)
    try {
      const res = await getApi(`user/${id}`)
      if (res.error) {
        setIsModalOpenError(true)
        setError(`Error al obtener el usuario `)
        return
      }
      openModalViewUser(res)
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


  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await deleleteApi(`user/${user.id}`)
      if (res.error) {
        setIsModalOpenError(true)
        setError("Error al eliminar el usuario ")
        return
      }
      fetchUsers(0)

    } catch (error) {
      //TODO  enviar error a log
      console.log(error);
      setIsModalOpenError(true)
      setError("Error al eliminar el usuario")
    } finally {
      setLoading(false)
      setIsModalOpenDelete(false)
    }

  }

  const handleEdit = async (updatedData, id) => {
    setLoading(true);
    try {
      const res = await putApi(`user/${id}`, updatedData);
      if (res.error) {
        {
          if (res.error === 'BODY_NOT_VALID')
            setError(`Correo electronico ya registrado`);
        }
        setIsModalOpenError(true)
        setError("Error al editar el usuario")
        return
      }
      fetchUsers(0)

    } catch (error) {
      //TODO  enviar error a log
      console.log(error);
      setIsModalOpenError(true)
      setError("Error al editar el usuario")
    } finally {
      setLoading(false)
    }

  }
  if (loading) {
    return (
      <ModalLoading isLoading={loading} />
    );
  }
  return (
    <>
      <div className="mb-2 sm:mb-0 w-full sm:w-1/4 hidden lg:flex">
        <p className="text-gray-800 font-semibold">{id}</p>
      </div>
      <div className="mb-2 sm:mb-0 w-full sm:w-1/4 ">
        <p className="text-gray-800">
          {handleChangePrefix(title)} {firstName} {lastName}
        </p>
      </div>
      <div className="w-full sm:w-1/4 flex justify-center  ">
        <img
          src={picture || userImagePlaceholder}
          alt={`${firstName} ${lastName}`}
          className="w-12 h-12 rounded-full"
        />
      </div>

      {/* Image */}

      {/* Actions */}
      <div className="w-full sm:w-1/4 flex justify-center space-x-2 mt-2 sm:mt-0">
        <button className="text-gray-500 hover:text-red-600" onClick={() => getUserById(user.id)} disabled={loading}>🧑🏻‍💻</button>
        <button className="text-gray-500 hover:text-black" disabled={loading} onClick={() => showMOdalEdit(user.id)}>📝</button>
        <button className="text-gray-500 hover:text-red-600" disabled={loading} onClick={(() => setIsModalOpenDelete(true))}>🗑</button>
      </div>
      {
        isModalOpen && (
          <ModalUserDetails selectedUser={selectedUser} closeModal={closeModal} isEditing={isEditing} handleEdit={handleEdit} />
        )
      }
      {
        isModalOpenError && (
          <ModalError error={error} onClose={() => setIsModalOpenError(false)} />
        )
      }
      {
        isModalOpenDelete && (
          <ModalConfirmation
            message={`¿Estas seguro de eliminar el usuario ${firstName} ${lastName}?`}
            onConfirm={handleDeleteConfirmation}
            onCancel={() => setIsModalOpenDelete(false)}
          />
        )

      }
    </>
  )
}
export default UserList