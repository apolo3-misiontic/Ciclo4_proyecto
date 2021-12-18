import { useMutation, useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { REFRESCAR_TOKEN } from '../../graphql/Auth/Queries'
import { useAuth } from '../../hooks/authContext'
import Sidebar from './Sidebar'

const Privado = () => {
    const { guardarToken } = useAuth()

    const [refrescar, { loading, data }] = useLazyQuery(REFRESCAR_TOKEN)

    const navigate = useNavigate()

    useEffect(() => {
        refrescar()
    }, [refrescar])

    useEffect(() => {

        if (data) {
            if (data.refrescarTokenUsuario.Token) {
                guardarToken(data.refrescarTokenUsuario.Token)
            } else {
                guardarToken(null)
                navigate("/ingresar", { replace: true })
            }
        }

    }, [data, guardarToken, navigate])


    if (loading) return <h1>Cargando...</h1>

    return (
        <Sidebar>
            <div className='ml-56'>
                <Outlet />
            </div>
        </Sidebar>
    )
}

export default Privado
