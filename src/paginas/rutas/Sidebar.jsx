import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthRol from "../../componentes/AuthRol";
import { useAuth } from "../../hooks/authContext";
import { useUsuario } from "../../hooks/usuarioContext";
import cohete from "../../imagenes/cohete_nombre.png"

const Sidebar = ({ children }) => {
  const navigate = useNavigate()
  const { guardarToken } = useAuth()
  const { dataUsuario } = useUsuario()

  const cerrarSesion = () => {
    guardarToken(false)
    //navigate("/", { replace: true })
    window.location.href = "/"
  }

  return (
    <>
      <div className="flex w-full h-full">
        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
        />
        <div className="fixed flex flex-col md:flex-row flex-nowrap h-full">
          <div className="min-h-screen flex flex-col bg-gray-700">
            <div className="flex flex-col mt-5 py-5 w-56  rounded-r-3xl overflow-hidden">
              <div className="w-full h-full flex justify-center items-center">
                <img src={cohete}></img>
              </div>
              <ul className="flex flex-col py-4">
                {
                  dataUsuario.Estado === "AUTORIZADO" &&
                  <>
                    <AuthRol listaRoles={["ADMINISTRADOR", "LIDER"]} >
                      <li>
                        <Link
                          to="usuarios"
                          //onClick={refrescar}
                          className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-100 hover:text-black"
                        >
                          <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                            <i className="fas fa-users"></i>
                          </span>
                          <span className="text-lg font-large">Usuarios</span>
                        </Link>
                      </li>
                    </AuthRol>
                    <li>
                      <Link
                        to="proyectos"
                        //onClick={refrescar}
                        className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-100 hover:text-black"
                      >
                        <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                          <i className="fas fa-project-diagram"></i>
                        </span>
                        <span className="text-lg font-large">Proyectos</span>
                      </Link>
                    </li>
                    <AuthRol listaRoles={["ESTUDIANTE", "LIDER"]} >
                      <li>
                        <Link
                          to="inscripciones"
                          //onClick={refrescar}
                          className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-100 hover:text-black"
                        >
                          <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                            <i className="fas fa-pencil-alt"></i>
                          </span>
                          <span className="text-lg font-large">Inscripciones</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="avances"
                          //onClick={refrescar}
                          className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-100 hover:text-black"
                        >
                          <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                            <i className="fas fa-book-reader"></i>
                          </span>
                          <span className="text-lg font-large">Avances</span>
                        </Link>
                      </li>
                    </AuthRol>
                  </>
                }
                <li>
                  <button
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-100 hover:text-black"
                    onClick={cerrarSesion}
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                      <i className="fas fa-power-off"></i>
                    </span>
                    <span className="text-lg font-large">Cerrar Sesion</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex  w-full flex-col items-stretch justify-start">
          {children}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
