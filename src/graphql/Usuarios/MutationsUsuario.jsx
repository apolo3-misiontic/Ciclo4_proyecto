import { gql } from '@apollo/client'

export const ACTUALIZAR_ESTADO_USUARIO = gql`
    mutation CambiarEstadoUsuario($_id: ID!, $EstadoPorAdmin: enum_EstadoRegistro) {
    cambiarEstadoUsuario(_id: $_id, EstadoPorAdmin: $EstadoPorAdmin) {
        _id
        Estado
        }
    }

`
