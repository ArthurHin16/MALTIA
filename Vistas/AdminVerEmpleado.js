import React, { useEffect, useState } from 'react';
import '../assets/css/headers.css'
import Menu from '../components/MenuAdmin';
import axios from 'axios';
import EditEmpleado from '../components/EditEmpleado';
import Header from '../components/header';
const bootstrap = require('bootstrap');

function AdminVerEmpleado(props) {
    const [employee, setEmployee] = useState({});

      useEffect(() => {
          console.log(props)
          axios.get(`http://localhost:5000/employees/${props.match.params.id}`) /*Poner la ruta dinámica*/
                .then((result) => {
                    console.log(result.data.data)
                    setEmployee(result.data.data)
                })
                .catch((error) => {
                    console.log(error)
                })
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
export default AdminVerEmpleado;