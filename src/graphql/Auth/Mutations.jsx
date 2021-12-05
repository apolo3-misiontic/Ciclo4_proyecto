import { gql } from '@apollo/client'

export const LOGUEO_USUARIO = gql`
    mutation LoginUsuario($Correo: String!, $Contrasena: String!)
    {
        loginUsuario(Correo: $Correo, Contrasena: $Contrasena) {
            Token
            Error
        }
    }

`

