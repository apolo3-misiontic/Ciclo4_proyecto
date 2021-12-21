import React, { useState } from "react";
import { ToastMui } from "../../componentes/ToastMui";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { useUsuario } from "../../hooks/usuarioContext";
import { LISTAR_AVANCES } from "../../graphql/Avances/QuerysAvance";
import AuthRol from "../../componentes/AuthRol";
import ModalAvance from "../../componentes/ModalAvance";
import { CREAR_AVANCE } from "../../graphql/Avances/MutationsAvance";
import { LISTAR_INSCRIPCIONES } from "../../graphql/Inscripciones/QuerysInscripcion";

const Avances = () => {
  const { dataUsuario } = useUsuario()

  const { data: dataListarAvance, loading: loadingListarAvance } = useQuery(LISTAR_AVANCES,
    {
      variables: {
        Avances_Lider: dataUsuario._id
      }
    }
  )

  const [listarEnModal, { data: dataListarInscripciones }] = useLazyQuery(LISTAR_INSCRIPCIONES)

  const [crearAvance, { data: dataCrearAvance, error: errorCrearAvance }] = useMutation(CREAR_AVANCE,
    {
      refetchQueries: [LISTAR_AVANCES]
    }
  )

  const [modalAbierto, setModalAbierto] = useState(false)

  const abrirModal = () => {
    listarEnModal()
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
  }

  return (
    <>
      <div className="absolute" >
        {errorCrearAvance && <ToastMui info="error" />}
        {dataCrearAvance && <ToastMui info="success" />}
      </div>
      <div>
        <link
          href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
          rel="stylesheet"
        />
        <div className="flex-row items-center justify-center min-h-screen min-w-full px-5 py-12 lg:px-20 bg-gray-900">
          <div className="flex items-center justify-center mb-3 text-green-300 mt-9 font-semibold">
            <h1 className="text-4xl">Avances</h1>
          </div>
          <AuthRol listaRoles={["ESTUDIANTE"]}>
            <div className="flex items-center justify-center mb-3">
              <button
                onClick={abrirModal}
                className="p-2 pl-5 pr-5 bg-green-300 text-gray-800 hover:bg-green-800 hover:text-gray-200 text-lg rounded-lg focus:border-4 border-blue-300"
              >
                Agregar Avance
              </button>
            </div>
          </AuthRol>
          <div className="flex items-center">
            <div className="overflow-auto lg:overflow-visible h-full w-full items-center">
              <div className="flex w-full justify-center items-center">
                {loadingListarAvance ? <h1 className="text-white">Cargando...</h1> :
                  <Tabla avances={dataListarAvance.listarAvances} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        dataListarAvance && dataListarInscripciones &&
        <ModalAvance
          abrir={modalAbierto}
          cerrar={cerrarModal}
          datos={dataListarInscripciones.listarInscripciones}
          usuario_id={dataUsuario._id}
          funcionCrear={crearAvance}
        />
      }
    </>
  );
};

const Tabla = ({ avances }) => {

  //const [actualizarEstado, { data, error }] = useMutation(CAMBIAR_ESTADO_INSCRIPCION)

  return (
    <>
      <table className="table text-gray-400 border-separate space-y-6 text-sm">
        <thead className="bg-gray-800 text-gray-100">
          <tr>
            <th className="p-3 items-center justify-center ">Proyecto</th>
            <th className="p-3 items-center justify-center ">Estudiante</th>
            <th className="p-3 items-center justify-center ">Fecha</th>
            <th className="p-3 items-center justify-center ">Descripcion</th>
            <th className="p-3 items-center justify-center ">Observaciones</th>
          </tr>
        </thead>
        {avances &&
          avances.map((avance, index) => {
            return (
              <CuerpoTabla
                key={index}
                Proyecto={avance.Proyecto_Id.Nombre_Proyecto}
                Nombre_Estudiante={avance.Estudiante_Id}
                Fecha={avance.Fecha_Avance}
                Descripcion={avance.Descripcion}
                Observaciones={avance.Observaciones}
              />
            )
          }
          )
        }
      </table>
    </>
  )
}

const CuerpoTabla = ({ Proyecto, Nombre_Estudiante, Fecha, Descripcion, Observaciones }) => {
  return (
    <>
      <tbody>
        <tr className="bg-gray-800 text-gray-100 ">
          <td className="p-3 justify-center items-center text-center">
            {Proyecto}
          </td>
          <td className="p-3 justify-center items-center text-center">
            {Nombre_Estudiante.Primer_Nombre} {Nombre_Estudiante.Primer_Apellido}
          </td>
          <td className="p-3 justify-center items-center text-center">
            {Fecha}
          </td>
          <td className="p-3 justify-center items-center text-center">
            {Descripcion}
          </td>
          <td className="p-3 justify-center items-center text-center">
            {Observaciones}
          </td >
        </tr >
      </tbody>
    </>
  );

};

export default Avances;