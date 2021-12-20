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