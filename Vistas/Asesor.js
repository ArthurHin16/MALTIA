import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import '../assets/css/admin.css';
import Clientes from '../components/CardCliente';
import Prestatario from '../components/CardPrestatario';
import Cliente from '../components/VerClienteAsesor';
import Solicitud from '../components/CardSolicitudAsesor';
import VerSolicitudAsesor from '../components/VerSolicitudAsesor';
import Menu from '../components/MenuAsesor';
import FormPrestatario from '../components/FormPrestatario';
import FormProspecto from '../components/FormProspecto';
import FormSolicitud from '../components/FormSolicitud';
import AddProspecto from '../components/AddProspecto';
import AddPrestatario from '../components/AddPrestatario';
import AddSolicitud from '../components/AddSolicitud';
import VerPrestatario from '../components/VerPrestatario';
import Header from '../components/header';


import userEvent from '@testing-library/user-event';


const bootstrap = require('bootstrap');

function Asesor() {
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
                            <header>
                                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom">
                                    <h1 class="h2">Asesor</h1>

                                    

                                </div>
                                    
                                    {/* 
                                    <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
                                        <p class="fs-5 text-muted">¡Bienvenido Asesor! A continuación puedes elegir la acción a realizar para manipular las solicitudes</p>
                                    </div>
                                    */}
                            </header>
                                        <Route path="/EditarProspecto/:id" render= {(props) => <FormProspecto {...props}/>}/>
                                        <Route path="/EditarPrestatario/:id" render= {(props) => <FormPrestatario {...props}/>}/>
                                        <Route path="/EditarSolicitud/:id" render= {(props) => <FormSolicitud {...props}/>}/>
                                        <Route path="/Solicitudes/:id" exact={true} render= {(props) => <VerSolicitudAsesor {...props}/>}/>
                                        <Route path="/Prospectos/:id"  exact={true} render={(props) => <Cliente {...props}/>}/>
                                        <Route path="/Prestatarios/:id" exact={true} render= {(props) => <VerPrestatario {...props}/>}/>
                                        <Route path="/AddProspecto" exact={true} render= {(props) => <AddProspecto {...props}/>}/>
                                        <Route path="/Prospecto/a-Prestatario/Solicitud" exact={true} render= {(props) => <AddSolicitud {...props}/>}/>
                                        <Route path="/Prospecto/a-Prestatario" exact={true} render= {(props) => <AddPrestatario {...props}/>}/>
                                        
                                        <Route path="/Solicitudes" exact={true} render= {(props) => <Solicitud {...props}/>}/>
                                        <Route path="/Prestatarios" exact={true} render= {(props) => <Prestatario {...props}/>}/>
                                        <Route path="/Prospectos" exact={true} render= {(props) => <Clientes {...props}/>}/>
                                        
                                        
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

export default Asesor;