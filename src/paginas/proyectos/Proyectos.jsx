import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastMui } from "../../componentes/ToastMui";
import { useMutation, useQuery } from "@apollo/client"
import { LISTAR_PROYECTOS } from "../../graphql/Proyectos/QuerysProyecto";
import AuthRol from "../../componentes/AuthRol";
import { ACTUALIZAR_ESTADO_PROYECTO } from "../../graphql/Proyectos/MutationsProyecto";

const Proyectos = () => {

  const { data, loading, error } = useQuery(LISTAR_PROYECTOS)


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
          <h1 className="text-4xl">Proyectos</h1>
        </div>
        <div className="flex items-center">
          <div className="overflow-auto lg:overflow-visible h-full w-full items-center">
            <div className="flex w-full justify-center items-center ">
              {loading ? <h1 className="text-white">Cargando...</h1> :
                <Tabla proyectos={data.listarProyectos} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tabla = ({ proyectos }) => {

  const [actualizarEstado, { data, error }] = useMutation(ACTUALIZAR_ESTADO_PROYECTO)

  return (
    <table className="table  text-gray-400 border-separate space-y-6 text-sm">
      <thead className="bg-gray-800 text-gray-100">
        <tr>
          <th className="p-3 items-center justify-center ">Proyecto</th>
          <th className="p-3 items-center justify-center ">Lider</th>
          <th className="p-3 items-center justify-center ">Fase</th>
          <th className="p-3 items-center justify-center" >Estado</th>
          <AuthRol listaRoles={["LIDER"]} >
            <th className="p-3 items-center justify-center ">Detalles</th>
          </AuthRol>
          <AuthRol listaRoles={["ESTUDIANTE"]} >
            <th className="p-3 items-center justify-center ">Inscribirse</th>
          </AuthRol>
        </tr>
      </thead>
      {
        proyectos &&
        proyectos.map((proyecto, index) => {
          return (
            <CuerpoTabla
              key={index}
              _id={proyecto._id}
              Proyecto={proyecto.Nombre_Proyecto}
              Lider={proyecto.Lider_Id}
              Fase={proyecto.Fase}
              Estado={proyecto.Estado}
              actualizarEstado={actualizarEstado}
            />
          )
        })
      }
    </table>
  )
}

const CuerpoTabla = ({ _id, Proyecto, Lider, Fase, Estado, actualizarEstado }) => {
  const [modificarEstado, setModificarEstado] = useState(false)
  const [modificarFase, setModificarFase] = useState(false)

  const [estadoSeleccionado, setEstadoSeleccionado] = useState(Estado)
  const [faseSeleccionada, setFaseSeleccionada] = useState(Fase)

  const estadoEditado = (id, valor) => {
    setModificarEstado(true)
    setEstadoSeleccionado(valor)
    console.log(estadoSeleccionado)
  }

  const faseEditada = (id, valor) => {
    setModificarFase(true)
    setFaseSeleccionada(valor)
    console.log(faseSeleccionada)
  }

  const reiniciarEstado = (id) => {
    document.getElementById(id).value = Estado
    setEstadoSeleccionado(Estado)
  }
  const reiniciarFase = (id) => {
    document.getElementById(id).value = Fase
    setFaseSeleccionada(Fase)
  }

  const ejecutarCambio = (informacion) => {
    actualizarEstado({
      variables: { ...informacion },
      optimisticResponse: true,
      update: (cache) => {

        const proyectosListados = cache.readQuery({ query: LISTAR_PROYECTOS });
        const nuevoEstado = proyectosListados.listarProyectos.map(proyecto => {
          if (proyecto._id === informacion._id) {
            return { ...proyecto, Estado: proyecto.Estado };
          } else {
            return proyecto;
          }
        });
        cache.writeQuery({
          query: LISTAR_PROYECTOS,
          data: { listarProyectos: nuevoEstado }
        });
      }
    })
  };
  return (
    <>
      <tbody>
        <tr className="bg-gray-800 text-gray-100 ">
          <td className="p-3 justify-center items-center text-center">
            {Proyecto}
          </td>
          <td className="p-3 justify-center items-center text-center">
            {Lider.Primer_Nombre} {Lider.Primer_Apellido}
          </td>
          <td className="p-3 justify-center items-center text-center">
            {Fase}
          </td>
          <td className="relative p-3 justify-center items-center font-bold space-x-2 ">
            <select id={_id} className="flex  bg-transparent w-40 focus:bg-gray-700 border border-green-300 rounded-md"
              defaultValue={Estado}
              onChange={(e) => estadoEditado(_id, e.target.value)}>
              <option className="bg-gray-800 text-center" value={"ACTIVO"} >ACTIVO</option>
              <option className="bg-gray-800 text-center" value={"INACTIVO"}>INACTIVO</option>
            </select>
            <AuthRol listaRoles={["LIDER"]} >
              <td className="p-3 justify-center items-center text-center">
                BOTON DETALLE
              </td>
            </AuthRol>
            <AuthRol listaRoles={["ESTUDIANTE"]} >
              <td className="p-3 justify-center items-center text-center">
                BOTON INSCIRBIRSE
              </td>
            </AuthRol>
            {estadoSeleccionado !== Estado ? modificarEstado &&
              <div className="absolute space-x-5 bottom-3 -right-1/3">
                <button
                  title="Confirmar"
                  onClick={() => ejecutarCambio({ _id: _id, Estado: estadoSeleccionado, Fase: Fase })}>
                  <i className="fas fa-check fa-lg text-green-500" ></i>
                </button>
                <button
                  title="Cancelar"
                  onClick={() => reiniciarEstado(_id)} >
                  <i className="fas fa-times fa-lg text-red-700" ></i>
                </button>
              </div>
              : null}
          </td >
        </tr >
      </tbody>
    </>
  );
}
export default Proyectos;