import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGUEO_USUARIO } from '../../graphql/Auth/Mutations'
import { useAuth } from '../../hooks/authContext'
import { useUsuario } from '../../hooks/usuarioContext'
import "../estilos/login.css";
import ModalAcceso from '../../componentes/ModalAcceso'

const Acceso = () => {
    const [formulario, setFomulario] = useState({})
    const [abrirModal, setAbrirModal] = useState(false)
    const { guardarToken, setPermitirRefrescar } = useAuth()

    const [login, { data, loading, error }] = useMutation(LOGUEO_USUARIO)

    const navigate = useNavigate()

    const guardarCampos = (campo, valor) => {
        setFomulario({
            ...formulario,
            [campo]: valor ? valor : undefined
        })
    }

    const cargarAcceso = (e) => {
        e.preventDefault()
        login({
            variables: {
                ...formulario
            }
        })
    }

    useEffect(() => {
        if (data) {
            if (data.loginUsuario.Error) {
                setAbrirModal(true)
            } else {
                guardarToken(data.loginUsuario.Token)
                navigate("/sesion", { replace: true })
            }
        }
    }, [data, navigate, guardarToken])

    if (error) return <h1>ERRRORRR {error.message}</h1>

    return (
        <>
            <div className='bg-gray-900 divPadre flex-row min-h-screen min-w-full'>
                <div className='divForm'>
                    <form className='formulario' onSubmit={cargarAcceso} >
                        <input type='hidden' name='remember' />
                        <div className='divSec'>
                            <div>
                                <input
                                    name='Correo'
                                    type='email'
                                    autoComplete='email'
                                    required
                                    className='campo correo'
                                    placeholder='Correo Electrónico'
                                    onChange={(e) => guardarCampos("Correo", e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    name='Contrasena'
                                    type='password'
                                    autoComplete='current-password'
                                    required
                                    className='campo contra'
                                    placeholder='Contraseña'
                                    onChange={(e) => guardarCampos("Contrasena", e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button type='submit' className='boton bg-green-300' >
                                Iniciar Sesión
                            </button>
                        </div>
                        <div className='regdiv'>
                            <span className='regtext'>Si no tienes cuenta</span>
                            <Link className='reglink' to="/registrar">
                                <span className="text-green-300">Registrate</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <ModalAcceso
                abrir={abrirModal}
                cerrar={setAbrirModal}
            />


        </>
    )
}

export default Acceso
