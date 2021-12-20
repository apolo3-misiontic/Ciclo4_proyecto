import { gql } from "@apollo/client";


export const LISTAR_PROYECTOS = gql`
    query ListarProyectos {
        listarProyectos {
            _id
            Nombre_Proyecto
            Lider_Id {
                Primer_Nombre
                Primer_Apellido
            }
            Estado
            Fase
        }
    }
`
