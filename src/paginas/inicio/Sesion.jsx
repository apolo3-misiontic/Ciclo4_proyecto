import React from 'react'
import { useUsuario } from '../../hooks/usuarioContext'
import { ReactComponent as Logo } from '../../imagenes/svg_modificado.svg'
import { ReactComponent as Prohibido } from '../../imagenes/forbidden.svg'

const Sesion = () => {
    const { dataUsuario } = useUsuario()
    
    return (
        <div className='flex flex-col min-h-screen min-w-full items-center p-10 space-y-5 bg-gray-900' >
            <h1 className='font-bold text-5xl text-green-300' >Bienvenido</h1>
            <h2 className='font-bold text-3xl text-green-300' >{dataUsuario.Primer_Nombre} {dataUsuario.Primer_Apellido}</h2>
            {dataUsuario.Estado === "AUTORIZADO" && < Logo className='w-6/12' ></Logo>}
            {dataUsuario.Estado !== "AUTORIZADO" &&
                <>
                    < Prohibido className='w-1/5' ></Prohibido>
                    <h2 className='font-bold text-3xl text-green-300' >
                        Ops! No tienes acceso a la plataforma
                    </h2>
                    <label className='text-green-300 text-2xl' >
                        Tu estado es:
                    </label>
                    <strong className={dataUsuario.Estado === "PENDIENTE" ? "text-yellow-500" : "text-red-600"} >
                        {dataUsuario.Estado}
                    </strong>
                </>
            }
        </div >
    )
}

export default Sesion
