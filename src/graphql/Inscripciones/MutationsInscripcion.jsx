import { gql } from "@apollo/client";

export const INSCRIPCION_A_PROYECTO = gql`
    mutation CrearInscripcion($Proyecto_Id: String!, $Estudiante_Id: String!) {
        crearInscripcion(Proyecto_Id: $Proyecto_Id, Estudiante_Id: $Estudiante_Id) {
            _id
        }
    }
  
`
export const CAMBIAR_ESTADO_INSCRIPCION = gql`
    mutation ModificarEstadoInscripcion($_id: ID!, $Estado: enum_EstadoInscripcion!) {
        modificarEstadoInscripcion(_id: $_id, Estado: $Estado) {
            _id
            Estado
            Fecha_Ingreso
        }
    }
`