const { gql } = require("apollo-server-express");

const type_Proyectos = gql `

    enum enum_EstadoProyecto{
        ACTIVO
        INACTIVO
    }
    enum enum_FaseProyecto{
        INICIADO
        EN_DESARROLLO
        TERMINADO
        NULL
    }

    type Proyecto{
        _id: ID!
        Nombre_Proyecto: String!
        Objetivo_General: String
        Objetivos_Especificos: [String]
        Presupuesto: Float!
        Fecha_Inicio: Date!
        Fecha_Terminacion: Date!
        Lider_Id: Usuario!
        Estado: enum_EstadoProyecto!
        Fase: enum_FaseProyecto!
        Inscripciones: [Inscripcion]
    }

    type Query{
        listarProyectos:[Proyecto]
        buscarProyecto(_id: ID!): Proyecto
        buscarProyectosPorLider(Lider_Id: String!): [Proyecto]
    }



    type Mutation{
        crearProyecto(
            Nombre_Proyecto: String!,
            Objetivo_General: String,
            Objetivos_Especificos: [String],
            Presupuesto: Float!,
            Fecha_Inicio: Date!,
            Fecha_Terminacion: Date!,
            Lider_Id: String!,
            Estado: enum_EstadoProyecto,
            Fase: enum_FaseProyecto
        ): Proyecto
        
        editarProyecto(
            _id: ID!
            Nombre_Proyecto: String,
            Objetivo_General: String,
            Objetivos_Especificos: [String],
            Presupuesto: Float,
            Fecha_Inicio: Date,
            Fecha_Terminacion: Date,
            Estado: enum_EstadoProyecto,
            Fase: enum_FaseProyecto
        ) : Proyecto

        eliminarProyecto(_id:ID!): Proyecto
    }

`

module.exports = { type_Proyectos }