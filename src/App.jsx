import { useEffect, useState } from 'react';
import UserList from './componentes/UserList'
import { getApi, postApi } from './api/api';
import ModalError from './componentes/modals/ModalError';
import Pagination from './componentes/Pagination';
import userImagePlaceholder from './assets/user-placeholder.png'
import ModalLoading from './componentes/modals/ModalLoading';
import ModalNewUSer from './componentes/modals/ModalNewUSer';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 0,
    limit: 5
  });
  const [page, setPage] = useState(0);
  //error
  const [error, setError] = useState(null);
  const [isModalOpenError, setIsModalOpenError] = useState(false);
  // modal new user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);

  };

  // user
  const [id, setId] = useState('');
  const handleChangeIG = (e) => {
    setId(e.target.value);
  }


  const fetchUsers = async (newPage) => {
    setLoading(true);
    try {
      const data = await getApi(`user?page=${newPage}&limit=${pagination.limit}`);
      setUsers(data.data);
      setPagination({
        total: data.total,
        page: data.page,
        limit: data.limit
      });
    } catch (error) {
      //TODO  enviar error a log
      console.error(error);
      setError(`Error al obtener los usuarios`);
      setIsModalOpenError(true);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (newUser) => {
    setLoading(true);
    try {
      const data = await postApi('user/create', newUser);
      if (data.error) {
        if (data.error === 'BODY_NOT_VALID')
          setError(`Correo electronico ya registrado`);
        setIsModalOpenError(true);
        return;
      }
      fetchUsers(0);
    } catch (error) {
      //TODO  enviar error a log
      console.error(error);
      setError(`Error al crear el usuario`);
      setIsModalOpenError(true);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  }


  useEffect(() => {
    fetchUsers(page);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < Math.ceil(pagination.total / pagination.limit)) {
      fetchUsers(newPage);
      setPage(newPage);
    }

  };
  if (loading) {
    return (
      <ModalLoading isLoading={loading} />
    );
  }


  return (

    <div className="bg-white w-full ">
      <div className="p-4 bg-gray-100  ">
        {/* Header */}
        <div className="bg-teal-700 text-white px-6 py-4 flex justify-between items-center rounded-t">
          <h2 className="text-lg font-bold">Gestión de Usuarios </h2>
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
            <img src={userImagePlaceholder} alt="Avatar" />
          </div>
        </div>

        {/*  Search  */}
        <div className="flex-wrap gap-2 flex items-center justify-between p-3 bg-white border rounded-b mb-4">
          <div>
            <input
              name="id"
              onChange={handleChangeIG}
              value={id}
              type="text"
              placeholder="Id a buscar"
              className="border rounded px-2 py-1 w-full sm:w-2/3 focus:outline-none"
            />
            <button className="bg-teal-700 text-white px-4 py-1 rounded hover:bg-teal-600 sm:w-auto w-full" onClick={() => getUserById(id)}>
              Buscar
            </button>
          </div>
        </div>
        <button className="bg-teal-700 text-white px-4 py-1 rounded hover:bg-teal-600 sm:w-auto w-full" onClick={() => setIsModalOpen(true)}>
          Crear usuario
        </button>

        {/*  Users List */}
        <div className=" ">
          <div
            className="bg-white border rounded   p-4   flex-col md:flex-row justify-between items-center hidden md:flex"
          >
            <div className="mb-2 sm:mb-0 w-full sm:w-1/4 hidden lg:flex">
              <p className="text-sm font-bold text-gray-700 break-words">ID:</p>
            </div>
            <div className="mb-2 sm:mb-0 w-full sm:w-1/4">
              <p className="text-sm font-bold text-gray-700 break-words">Nombres y apellidos:</p>

            </div>
            <div className="w-full sm:w-1/4 flex justify-center">
              <p className="text-sm font-bold text-gray-700 break-words">Foto</p>
            </div>
            <div className="w-full sm:w-1/4 flex justify-center space-x-2 mt-2 sm:mt-0">
              <p className="text-sm font-bold text-gray-700 break-words">Acciones</p>
            </div>
          </div>
          {users.length > 0 ? users.map((user) => (
            <div
              key={user.id}
              className="bg-white border rounded shadow-sm p-3 flex   justify-between items-center hover:bg-gray-100"
            >
              <UserList user={user} fetchUsers={fetchUsers} />
            </div>
          ))
            :
            <div className="bg-white border rounded shadow-sm p-3   hover:bg-gray-100">
              <p className="text-sm font-bold text-gray-700 text-center">No se encontraron usuarios</p>
            </div>
          }
        </div>
        {/* Pagination */}
        <Pagination pagination={pagination} handlePageChange={handlePageChange} />
      </div>
      {
        isModalOpenError && (
          <ModalError error={error} onClose={() => setIsModalOpenError(false)} />
        )
      }
      {
        isModalOpen && (
          <ModalNewUSer closeModal={closeModal} handleSave={createUser} />
        )
      }

    </div>


  )
}

export default App
