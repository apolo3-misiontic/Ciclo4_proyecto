import { gql } from "@apollo/client";

export const CREAR_AVANCE = gql`
    mutation CrearAvance(
        $Proyecto_Id: String!
        $Estudiante_Id: String!
        $Descripcion: String!
        ) {
        crearAvance(
            Proyecto_Id: $Proyecto_Id
            Estudiante_Id: $Estudiante_Id
            Descripcion: $Descripcion
        ) {
            _id
            Fecha_Avance
            Descripcion
            Observaciones
        }
    }
`