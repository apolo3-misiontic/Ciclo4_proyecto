import React, { useEffect, useState } from "react";
import { ToastMui } from "../../componentes/ToastMui";
import { useMutation, useQuery } from "@apollo/client"
import { LISTAR_PROYECTOS } from "../../graphql/Proyectos/QuerysProyecto";
import AuthRol from "../../componentes/AuthRol";
import { ACTUALIZAR_ESTADO_PROYECTO, ACTUALIZAR_FASE_PROYECTO } from "../../graphql/Proyectos/MutationsProyecto";
import { useUsuario } from "../../hooks/usuarioContext";
import { INSCRIPCION_A_PROYECTO } from "../../graphql/Inscripciones/MutationsInscripcion";
import ModalMui from "../../componentes/ModalMui";

const Proyectos = () => {
  const { dataUsuario } = useUsuario()
  const { data, loading, error } = useQuery(LISTAR_PROYECTOS, (dataUsuario.Rol === "LIDER") &&
  {
    variables: {
      filtro: dataUsuario._id
    }
  })

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

  const [actualizarEstado, { data: dataEstado, error: errorEstado }] = useMutation(ACTUALIZAR_ESTADO_PROYECTO)
  const [actualizarFase, { data: dataFase, error: errorFase }] = useMutation(ACTUALIZAR_FASE_PROYECTO)
  const [inscribirse, { data: dataInscripcion, error: errorInscripcion }] = useMutation(INSCRIPCION_A_PROYECTO,
    {
      refetchQueries: [LISTAR_PROYECTOS]
    }
  )

  return (
    <>
      <div className="absolute" >
        {errorEstado && <ToastMui info="error" />}
        {errorFase && <ToastMui info="error" />}
        {errorInscripcion && <ToastMui info="error" />}
        {dataEstado && <ToastMui info="success" />}
        {dataFase && <ToastMui info="success" />}
        {dataInscripcion && <ToastMui info="success" />}
      </div>
      <table className="table  text-gray-400 border-separate space-y-6 text-sm">
        <thead className="bg-gray-800 text-gray-100">
          <tr>
            <th className="p-3 items-center justify-center ">Proyecto</th>
            <th className="p-3 items-center justify-center ">Lider</th>
            <th className="p-3 items-center justify-center ">Situacion</th>
            <AuthRol listaRoles={["LIDER", "ESTUDIANTE"]} >
              <th className="p-3 items-center justify-center ">Acciones</th>
            </AuthRol>
          </tr>
        </thead>
        <tbody>
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
                  Inscripciones={proyecto.Inscripciones}
                  actualizarEstado={actualizarEstado}
                  actualizarFase={actualizarFase}
                  inscribirse={inscribirse}
                />
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

const CuerpoTabla = ({ _id, Proyecto, Lider, Fase, Estado, Inscripciones, actualizarEstado, actualizarFase, inscribirse }) => {

  const { dataUsuario } = useUsuario()

  const [modalInscripcion, setModalInscripcion] = useState(false)

  const abrirModal = () => {
    setModalInscripcion(true)
  }

  const [verificarSiInscrito, setVerificarSiInscrito] = useState(false)
  const [modificarEstado, setModificarEstado] = useState(false)
  const [modificarFase, setModificarFase] = useState(false)

  const [estadoSeleccionado, setEstadoSeleccionado] = useState(Estado)
  const [faseSeleccionada, setFaseSeleccionada] = useState(Fase)

  const estadoEditado = (valor) => {
    setModificarEstado(true)
    setEstadoSeleccionado(valor)
  }

  const faseEditada = (valor) => {
    setModificarFase(true)
    setFaseSeleccionada(valor)
  }

  const reiniciarEstado = (id) => {
    document.getElementById(id + "estado").value = Estado
    setEstadoSeleccionado(Estado)
  }
  const reiniciarFase = (id) => {
    document.getElementById(id + "fase").value = Fase
    setFaseSeleccionada(Fase)
  }

  const ejecutarCambioEstado = (informacionEstado) => {
    actualizarEstado({
      variables: { ...informacionEstado },
      optimisticResponse: true,
      update: (cache) => {

        const proyectosListados = cache.readQuery({ query: LISTAR_PROYECTOS });
        const nuevoEstado = proyectosListados.listarProyectos.map(proyecto => {
          if (proyecto._id === informacionEstado._id) {
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
  }

  const ejecutarCambioFase = (informacionFase) => {
    actualizarFase({
      variables: { ...informacionFase },
      optimisticResponse: true,
      update: (cache) => {

        const proyectosListados = cache.readQuery({ query: LISTAR_PROYECTOS });
        const nuevaFase = proyectosListados.listarProyectos.map(proyecto => {
          if (proyecto._id === informacionFase._id) {
            return { ...proyecto, Fase: proyecto.Fase };
          } else {
            return proyecto;
          }
        });
        cache.writeQuery({
          query: LISTAR_PROYECTOS,
          data: { listarProyectos: nuevaFase }
        });
      }
    })
  }

  useEffect(() => {
    if (Inscripciones.length >= 0) {
      let proyectoInsc = Inscripciones.map((estudiante) => {
        if (Object.keys(estudiante).includes("Estudiante_Id")) {
          if (estudiante.Estudiante_Id._id === dataUsuario._id) {
            setVerificarSiInscrito(true)
          }
        }
        return estudiante
      })
    }
  }, [setVerificarSiInscrito, Inscripciones, dataUsuario._id])

  return (
    <>
      {!verificarSiInscrito &&
        <tr className="bg-gray-800 text-gray-100 ">
          <td className="p-3 justify-center items-center text-center">
            {Proyecto}
          </td>
          <td className="p-3 justify-center items-center text-center">
            {Lider.Primer_Nombre} {Lider.Primer_Apellido}
          </td>
          <td className="relative grid-row p-3 space-y-3 justify-center items-center text-center ">
            <div className="flex justify-between items-center text-center" >
              <strong className="w-16" >Fase : </strong>
              <AuthRol listaRoles={["ADMINISTRADOR"]}>
                {(Fase === "EN_DESARROLLO") ?
                  <select id={_id + "fase"} className="flex bg-transparent w-36 focus:bg-gray-700 border border-green-300 rounded-md"
                    defaultValue={Fase}
                    onChange={(e) => faseEditada(e.target.value)}>
                    <option className="bg-gray-800 text-center" value={"TERMINADO"} >TERMINADO</option>
                    <option className="bg-gray-800 text-center" value={"EN_DESARROLLO"}>EN DESARROLLO</option>
                  </select>
                  :
                  <label className="w-36" >{Fase}</label>
                }
              </AuthRol>
              <AuthRol listaRoles={["LIDER", "ESTUDIANTE"]}>
                <label className="w-36" >{Fase}</label>
              </AuthRol>
            </div>
            <div className="flex justify-between items-center text-center" >
              <strong className="w-16" >Estado : </strong>
              <AuthRol listaRoles={["ADMINISTRADOR"]}>
                <select id={_id + "estado"} className="flex bg-transparent w-36 focus:bg-gray-700 border border-green-300 rounded-md"
                  defaultValue={Estado}
                  onChange={(e) => estadoEditado(e.target.value)}>
                  <option className="bg-gray-800 text-center" value={"ACTIVO"} >ACTIVO</option>
                  <option className="bg-gray-800 text-center" value={"INACTIVO"}>INACTIVO</option>
                </select>
              </AuthRol>
              <AuthRol listaRoles={["LIDER", "ESTUDIANTE"]}>
                <label className="w-36" >{Estado}</label>
              </AuthRol>
            </div>
            {faseSeleccionada !== Fase ? modificarFase &&
              <div className="absolute space-x-5 bottom-12 -right-1/4">
                <button
                  title="Confirmar"
                  onClick={() => ejecutarCambioFase({ _id: _id, Fase: faseSeleccionada })}>
                  <i className="fas fa-check fa-lg text-green-500" ></i>
                </button>
                <button
                  title="Cancelar"
                  onClick={() => reiniciarFase(_id)} >
                  <i className="fas fa-times fa-lg text-red-700" ></i>
                </button>
              </div>
              : null}
            {estadoSeleccionado !== Estado ? modificarEstado &&
              <div className="absolute space-x-5 bottom-3 -right-1/4">
                <button
                  title="Confirmar"
                  onClick={() => ejecutarCambioEstado({ _id: _id, Estado: estadoSeleccionado, Fase: Fase })}>
                  <i className="fas fa-check fa-lg text-green-500" ></i>
                </button>
                <button
                  title="Cancelar"
                  onClick={() => reiniciarEstado(_id)} >
                  <i className="fas fa-times fa-lg text-red-700" ></i>
                </button>
              </div>
              : null}
          </td>
          <AuthRol listaRoles={["LIDER"]} >
            <td className="p-3 justify-center items-center text-center">
              <i className="far fa-play-circle fa-3x transition ease-in-out cursor-pointer hover:text-green-300"></i>
            </td>
          </AuthRol>
          <AuthRol listaRoles={["ESTUDIANTE"]} >
            <td className="p-3 justify-center items-center text-center">
              {Estado === "ACTIVO" ?
                <>
                  <button
                    onClick={abrirModal} >
                    <i className="fas fa-pen-fancy fa-2x transition transform ease-in-out cursor-pointer hover:-translate-y-1 hover:text-yellow-400" title="Realizar Inscripcion" ></i>
                  </button>
                  <ModalMui
                    abrir={modalInscripcion}
                    cerrar={setModalInscripcion}
                    datos={{
                      Proyecto: Proyecto,
                      Lider: Lider,
                      completarInscripcion: {
                        inscribirse: inscribirse,
                        variablesInscripcion: { Proyecto_Id: _id, Estudiante_Id: dataUsuario._id }
                      }
                    }}
                  />
                </>
                :
                <i className="fas fa-lock fa-2x text-red-600" title="Accion Bloqueada"></i>
              }
            </td>
          </AuthRol>
        </tr >
      }
    </>
  );
}
export default Proyectos;