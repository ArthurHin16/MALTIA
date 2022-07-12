import React, { useState } from 'react';
import '../assets/css/Login.css'
import Maltia from '../assets/images/Maltiauser.PNG';
import { useAuth } from '../auth-context';
function InicioMaltia(){
    const { login } =useAuth();

    const [correo,setCorreo] = useState('')
    const [password,setPassword] = useState('')
  
    function handleChangeCorreo(e){
      setCorreo(e.target.value);
    }
  
    function handleChangePassword(e){
      setPassword(e.target.value);
    }
  
    function handleLogin(e){
      e.preventDefault();
      console.log(correo,password)
      login({correo,password})
    }
      
    return(
        <div id = "loginbody" >
          <div className = "login">
            <img className = "avatarmaltia" src = {Maltia} alt = "Logodemaltia"/>
            <h1>¡Bienvenido!</h1>
            <form onSubmit={handleLogin}>
              <label for="correo">Correo</label>
              <input type = "text" placeholder = "Ingrese su correo" onChange={handleChangeCorreo} value={correo}/>
              <label for="password">Password</label>
              <input type = "password" placeholder = "Ingrese su contraseña" onChange={handleChangePassword} value={password}/>
              <input type="submit" id ="loginmal" value="Log In"/>
            </form>
          </div>
        </div>
    ); 
}
export default InicioMaltia;