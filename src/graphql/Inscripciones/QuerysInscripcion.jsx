import { gql } from "@apollo/client";


export const LISTAR_INSCRIPCIONES = gql`
   query ListarInscripciones($Inscripciones_Lider: String) {
        listarInscripciones(Inscripciones_Lider: $Inscripciones_Lider) {
            _id
            Proyecto_Id {
                _id
                Nombre_Proyecto
                Lider_Id {
                    _id
                }
            }
            Estudiante_Id {
                Primer_Nombre
                Primer_Apellido
            }
            Fecha_Ingreso
            Fecha_Egreso
            Estado
        }
    }

`