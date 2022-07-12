import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import '../assets/css/admin.css';
import Solicitud from '../components/CardSolicitud';
import Forms from '../components/formularioSolicitud';
import Menu from '../components/MenuAnallista'; 
import Greporte from '../components/GenerarReporte';
import VerSolicitud from '../components/VerSolicitud';
import Header from '../components/header';
import Pagination from '../components/pagination';
const bootstrap = require('bootstrap'); 

function analista() {
  return (
<Router>
    <div lang="en">
        <div>
            <body>      
                <Route render= {(props) => <Header {...props}/>}/>
                <Switch>
                    <div class="container-fluid">
                        <div class="row">
                        <Route render= {(props) => <Menu {...props}/>}/>
                            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom">
                                    <h1 class="h2">Analista</h1>

                                    <div class="dropdown">
                                        <a class="btn btn-outline-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                            Filtro
                                        </a>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            <li><a class="dropdown-item" href="#">Aceptadas</a></li>
                                            <li><a class="dropdown-item" href="#">En revisión</a></li>
                                            <li><a class="dropdown-item" href="#">Rechazadas</a></li>
                                        </ul>
                                    </div>                         
                                </div>
                                    <h2 id="textbt">Solicitudes</h2>
                                <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
                                    <p class="fs-5 text-muted">¡Bienvenido Carlos! A continuación puedes elegir la acción a realizar para manipular las solicitudes  </p>
                                </div>

                                <main> 
                                    <Route path="/Solicitud/:id" render= {(props) => <VerSolicitud {...props}/>} exact/>
                                    <Route path="/SolicitudCard" render= {(props) => <Solicitud {...props}/>}/>
                                    <Route path="/SolicitudForm/:id" render= {(props) => <Forms {...props}/>}/>
                                    <Route path="/SolicitudReporte" render= {(props) => <Greporte {...props}/>}/>
                                    
                                </main>
                                <hr/>
                                <div>
                                    <br/>
                                    <Pagination/>
                                </div>
                            </main>
                        </div>    
                    </div>
                </Switch>
            </body>
        </div>
    </div>
</Router>
  );
}

export default analista;

