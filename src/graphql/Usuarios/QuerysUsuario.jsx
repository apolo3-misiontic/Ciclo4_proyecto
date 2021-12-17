import { gql } from '@apollo/client'

export const LISTAR_USUARIOS = gql`
    query ListarUsuarios {
    listarUsuarios {
        _id
        Primer_Nombre
        Primer_Apellido
        Correo
        Identificacion
        Rol
        Estado
        }
    }
`