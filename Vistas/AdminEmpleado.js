import React from 'react';
import '../assets/css/headers.css'
import Menu from '../components/MenuAdmin';
import EditEmpleado from '../components/EditEmpleado';
import Header from '../components/header';

const bootstrap = require('bootstrap');

function AdminEmpleado(props) {
    //Mock Data
  const employee = {
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    correo: '',
    status: '',
    telefono: '',
    password: '',
    puesto: 'asesor',
    storeID: ''
  }

  return (
            <div lang="en">
                <div>
                    <body>    
                        <div>
                            <Header/>
                        </div>
                        <div class="container-fluid">

                            <div class="row">
                                <Menu/>
                                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                                    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom"> {/*Componente filtro administrador*/}
                                        <h2>Nuevo Asesor</h2>
                                    </div>

                                    <main> {/*Componente CARD*/}
                                        <EditEmpleado employee={employee}/>
                                    </main>
                                </main>
                            </div>    
                        </div>
                    </body>
                </div>
            </div>
  );
}
export default AdminEmpleado;