import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Acceso from './paginas/autorizacion/Acceso';
import Registro from './paginas/autorizacion/Registro';
import Presentacion from './paginas/inicio/Presentacion';
import Sesion from './paginas/inicio/Sesion';
import Privado from './paginas/rutas/Privado';
import Publico from './paginas/rutas/Publico';
import { AuthContext } from './hooks/authContext';
import { UsuarioContext } from './hooks/usuarioContext';
import jwtDecode from 'jwt-decode';
import Avances from './paginas/avances/Avances';
import Inscrip from './paginas/inscripciones/Inscripciones';
import Proyectos from './paginas/proyectos/Proyectos';
import Usuarios from './paginas/usuarios/Usuarios';
import CrearUsuario from './paginas/usuarios/Crear-Usuario';
import DetalleUsuario from './paginas/usuarios/Detalle-Usuario';
import Login from './paginas/autorizacion/Login';
import Landingpage from './paginas/landingpage/landingpage';



function App() {

  const [dataUsuario, setDataUsuario] = useState({})
  const [token, setToken] = useState("")

  const guardarToken = (token) => {
    if (token) {
      setToken(token)
      localStorage.setItem("Token", JSON.stringify(token))
    } else {
      localStorage.removeItem("Token")
    }
  }

  useEffect(() => {
    if (token) {
      const info_usuario = jwtDecode(token)
      setDataUsuario({ ...info_usuario })
    }
  }, [token])

  console.log(token)
  console.log(dataUsuario)
  
  return (
    <AuthContext.Provider value={{ token, setToken, guardarToken }} >
      <UsuarioContext.Provider value={{ dataUsuario, setDataUsuario }}>
        <BrowserRouter>
          <Routes>
            <Route path="/sesion" element={<Privado />} >
              <Route index element={<Sesion />} />
            </Route>
            <Route path="/" element={<Publico />}>
              <Route index element={<Landingpage />} />
              <Route path="avances" element={<Avances />} />
              <Route path="inscrip" element={<Inscrip />} />
              <Route path="proyectos" element={<Proyectos />} />
              <Route path="usuarios" element={<Usuarios />} />
              <Route path="newuser" element={<CrearUsuario />} />
              <Route path="/detuser/:id" element={<DetalleUsuario />} />
              <Route path="ingresar" element={<Acceso />} />
              <Route path="login" element={<Login />} />
              <Route path="registrar" element={<Registro />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UsuarioContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
