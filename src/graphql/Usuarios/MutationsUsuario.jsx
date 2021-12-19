import { gql } from '@apollo/client'

export const ACTUALIZAR_ESTADO_USUARIO = gql`
    mutation CambiarEstadoUsuario($_id: ID!, $Estado: enum_EstadoRegistro!) {
    cambiarEstadoUsuario(_id: $_id, Estado: $Estado) {
        _id
        Estado
        }
    }

`
