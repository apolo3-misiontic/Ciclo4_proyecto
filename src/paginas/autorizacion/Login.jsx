import React from 'react';
//import Google from '../assets/image/google_logo.png';
import { Link } from 'react-router-dom';
import "../estilos/login.css";

const Login = () => {
  return (
    <div className= 'divPadre'>
      <div className='divForm'>
        <form className='formulario'>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='divSec'>
            <div>
              <input
                name='email'
                type='email'
                autoComplete='email'
                required
                className='campo correo'
                placeholder='Correo Electrónico'
              />
            </div>
            <div>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='campo contra'
                placeholder='Contraseña'
              />
            </div>
          </div>
          <div>
          <Link to='/' className= 'btnlink'>
            <button type='submit' className= 'boton bg-green-300' >
              INICIAR SESION
            </button>
          </Link>
          </div>
          <div className='regdiv'>
            <span className= 'regtext'>Si no tienes cuenta</span>
            <Link className= 'reglink' to="/newuser">
              <span className="text-green-300">REGISTRATE</span>
            </Link>
          </div>
        </form>
      </div>     
    </div>
  );
};

export default Login;
