import { gql } from '@apollo/client'

export const ACTUALIZAR_ESTADO_USUARIO = gql`
    mutation CambiarEstadoUsuario($_id: ID!, $Estado: enum_EstadoRegistro!) {
    cambiarEstadoUsuario(_id: $_id, Estado: $Estado) {
        _id
        Estado
        }
    }

`
export const REGISTRAR_USUARIO = gql`
    mutation RegistrarUsuario(
        $Primer_Nombre: String!
        $Segundo_Nombre: String
        $Primer_Apellido: String!
        $Segundo_Apellido: String!
        $Correo: String!
        $Identificacion: String!
        $Contrasena: String!
        $Rol: enum_Roles!
    )   {
        registrarUsuario(
            Primer_Nombre: $Primer_Nombre
            Segundo_Nombre: $Segundo_Nombre
            Primer_Apellido: $Primer_Apellido
            Segundo_Apellido: $Segundo_Apellido
            Correo: $Correo
            Identificacion: $Identificacion
            Contrasena: $Contrasena
            Rol: $Rol
        ) {
            Token
            Error
        }
    }

`