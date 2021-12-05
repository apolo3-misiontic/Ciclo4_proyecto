import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { REFRESCAR_TOKEN } from '../../graphql/Auth/Queries'
import { useAuth } from '../../hooks/authContext'
import { NavbarTail } from '../../layouts/NavbarTail'

const Privado = () => {
    /* const navigate = useNavigate()
    const { guardarToken } = useAuth()

    const { loading, data } = useQuery(REFRESCAR_TOKEN)
    
    
    if (loading) return <h1>Cargando hacia sesion...</h1>
    
    console.log(data)
    if (data?.refrescarTokenUsuario.Token) {
        guardarToken(data.refrescarTokenUsuario.Token)
    } else {
        navigate("/ingresar")
    } */

    return (
        <>
            <NavbarTail></NavbarTail>
            <Outlet></Outlet>
        </>
    )
}

export default Privado
