import { gql } from "@apollo/client";

export const LISTAR_AVANCES = gql`
    query ListarAvances($Avances_Lider: String) {
        listarAvances(Avances_Lider: $Avances_Lider) {
            _id
            Proyecto_Id {
                _id
                Nombre_Proyecto
            }
            Estudiante_Id {
                Primer_Nombre
                Primer_Apellido
            }
            Fecha_Avance
            Descripcion
            Observaciones
        }
    }
`