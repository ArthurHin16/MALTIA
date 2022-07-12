import React, { useEffect, useState } from 'react';
import '../assets/css/headers.css'
import Menu from '../components/MenuAdmin';
import Forms from '../components/formularioEmpleado';
import Header from '../components/header';
const bootstrap = require('bootstrap');

function AdminVerAnalista(props) {
    const [employee, setEmployee] = useState({});

      useEffect(() => {
        
      },[])
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
                                        <h2>Información de Empleado</h2>
                                    </div>

                                    <main> {/*Componente CARD*/}
                                        <Forms id={props.match.params.id} onSave={setEmployee}/>
                                    </main>
                                </main>
                            </div>    
                        </div>
                    </body>
                </div>
            </div>
  );
}
export default AdminVerAnalista;