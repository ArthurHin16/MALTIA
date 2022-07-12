import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Analista from './Vistas/Analista';
import Administrador from './Vistas/Administrador1';
import reportWebVitals from './reportWebVitals';
import Inicio from './Vistas/InicioMaltia';
import 'bootstrap/dist/css/bootstrap.css';
import InicioMaltia from './Vistas/InicioMaltia';
import MenuAsesor from './components/MenuAsesor';
import Administrador2 from './Vistas/AdminEmpleado';
import Loading from './components/Loading';
import Asesor from './Vistas/Asesor';
import FormSolicitud from './components/FormSolicitud';

import {AuthProvider} from './auth-context';
import Division from './Vistas/Division';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App/>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
