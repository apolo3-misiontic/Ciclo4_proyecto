import { gql } from "@apollo/client";

export const ACTUALIZAR_ESTADO_PROYECTO = gql`
    mutation CambiarEstadoProyecto(
        $_id: ID!
        $Estado: enum_EstadoProyecto!
        $Fase: enum_FaseProyecto!
    ) {
        cambiarEstadoProyecto(_id: $_id, Estado: $Estado, Fase: $Fase) { 
            _id
            Estado
            Fase
        }
    }

`
export const ACTUALIZAR_FASE_PROYECTO = gql`
    mutation CambiarFaseProyecto($id: ID!, $fase: enum_FaseProyecto!) {
        cambiarFaseProyecto(_id: $id, Fase: $fase) {
            _id
            Estado
            Fase
            Fecha_Terminacion
        }
    }
`

