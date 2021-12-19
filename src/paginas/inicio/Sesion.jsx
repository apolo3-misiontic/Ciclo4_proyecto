import React from 'react'
import { useUsuario } from '../../hooks/usuarioContext'
import { ReactComponent as Logo } from '../../imagenes/svg_modificado.svg'

const Sesion = () => {
    const { dataUsuario } = useUsuario()

    console.log(dataUsuario)
    return (
        <div className='flex flex-col min-h-screen min-w-full items-center p-10 space-y-5 bg-gray-900' >
            <h1 className='font-bold text-5xl text-green-300' >Bienvenido</h1>
            <h2 className='font-bold text-3xl text-green-300' >{dataUsuario.Primer_Nombre} {dataUsuario.Primer_Apellido}</h2>
            <Logo className='w-6/12' ></Logo>
        </div>
    )
}

export default Sesion
