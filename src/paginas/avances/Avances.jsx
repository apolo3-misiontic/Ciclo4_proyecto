import "../estilos/Main.css";
import Navbar from "../rutas/Sidebar";

const Avances = () => {
  return (
      <div>
        <link
          href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
          rel="stylesheet"
        />
        <div className="flex-row items-center justify-center min-h-screen min-w-full px-5 py-12 lg:px-20 bg-gray-900">
          {/*<div className="">
              <div
                class="flex items-center max-w-md mx-auto bg-white rounded-full "
                x-data="{ search: '' }"
              >
                <div class="w-full">
                  <input
                    onChange={(x) => {
                      aplicarFiltro(x.target.value);
                      if (x.target.value.length === 0) {
                        limpiarFiltro();
                      }
                    }}
                    type="search"
                    class="w-full px-4 py-1 text-gray-900 rounded-full focus:outline-none"
                    placeholder="Search"
                    x-model="search"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    class="bg-green-300 flex items-center justify-center w-12 h-12 text-gray-100 rounded-full"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>*/}

          <div className="flex items-center justify-center mb-3 text-green-300 mt-9 font-semibold">
            <h1 className="text-4xl">Avances</h1>
          </div>
          <div className="flex items-center">
            <div className="overflow-auto lg:overflow-visible h-full w-full items-center">
              <div className="flex w-full justify-center items-center ">
                <table className="table usuarios text-gray-400 border-separate space-y-6 text-sm">
                  <thead className="bg-gray-800 text-gray-100">
                    <tr>
                      <th className="p-3 items-center justify-center ">Proyecto</th>
                      <th className="p-3 items-center justify-center ">Estudiante</th>
                      <th className="p-3 items-center justify-center ">Fecha</th>
                      <th className="p-3 items-center justify-center ">Descripcion</th>
                      <th className="p-3 items-center justify-center ">Observacion</th>
                    </tr>
                  </thead>
                  {/*
                    <tbody>
                      {usuarios.map((user) => {
                        return (
                          <TableItem
                            Id={user._id}
                            nombre={user.Nombre}
                            userName={user.UserName}
                            rol={user.Rol}
                            estado={user.Estado}
                            refresh={ObtenerUsuarios}
                          />
                        );
                      })}
                    </tbody>
                    */}
                </table>
              </div>
              {/* <div>
                  <Link to="/newuser">
                    <button className="mt-5 p-2 pl-5 pr-5 bg-green-300 text-gray-800 hover:bg-green-800 hover:text-gray-200 text-lg rounded-lg focus:border-4 border-blue-300">
                      Agregar Usuario
                    </button>
                  </Link>
                </div> */}
            </div>
          </div>
        </div>
      </div>
  );
};

/*
const TableItem = ({ Id, nombre, userName, rol, estado, refresh }) => {
  const borrarItem = async () => {
    Swal.fire({
      title: `Estas seguro de borrar el Usuario ${userName}?`,
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
      showLoaderOnConfirm: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const options = {
          method: "DELETE",
          url: `https://thawing-crag-36588.herokuapp.com/Usuarios/${Id}`,
          headers: {
            "Content-Type": "application/json",
          },
        };
        await axios
          .request(options)
          .then(function (response) {
            Swal.fire("Borrado!", "El Usuario ha sido borrado", "success").then(
              (x) => {
                refresh();
              }
            );
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    });
  };
  
  return (
    <tr className="bg-gray-800 text-gray-100">
      <td className="p-3 justify-center items-center">
        <div>{Id}</div>
      </td>
      <td className="p-3 justify-center items-center">
        <div>{nombre}</div>
      </td>
      <td className="p-3 justify-center items-center">
        <div>{userName}</div>
      </td>
      <td className="p-3 justify-center items-center">{rol}</td>
      <td className="p-3 justify-center items-center font-bold">{estado}</td>
      <td className="p-3 justify-center items-center">
        <Tooltip title="Editar Usuario" arrow>
          <Link to={`/admin/detalle-usuario/${Id}`}>
            <i
              class="bx bx-edit-alt hover:text-yellow-300"
              aria-label="Editar"
            ></i>
          </Link>
        </Tooltip>
        <Tooltip title="Borrar Usuario" arrow>
          <button
            className="pl-4"
            onClick={(x) => {
              borrarItem();
            }}
          >
            <i className="bx bx-trash hover:text-red-600"></i>
          </button>
        </Tooltip>
      </td>
    </tr>
  );
 
};
*/


export default Avances;