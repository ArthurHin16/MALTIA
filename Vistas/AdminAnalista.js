import React, { useEffect, useState } from 'react';
import '../assets/css/cardsEmployee.css';
import '../assets/css/headers.css'
import Analista from '../components/CardAnalista'; 
import Menu from '../components/MenuAdmin';
import Header from '../components/header';
import Pagination from '../components/pagination';
import axios from 'axios';
const bootstrap = require('bootstrap');
 
function AdminiAnalista() {
    const [employees, setEmployees] = useState([]);

      useEffect(() => {
          axios.get("http://localhost:5000/analysts")
                .then((result) => {
                    console.log(result.data.data)
                    setEmployees(result.data.data[0])
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
                                        <h2>Administrador</h2>
                                        <div class="dropdown">
                                            <a class="btn btn-outline-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                Estatus
                                            </a>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                <li><a class="dropdown-item" href="#">Activo</a></li>
                                                <li><a class="dropdown-item" href="#">Inactivo</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <br></br>

                                    <main > {/*Componente CARD*/}
                                        <div class="row row-cols-md-4 text-center"> 
                                            {employees.map((employees) => (
                                                <Analista
                                                    key={employees.employeeID}
                                                    employees={employees}
                                                />
                                            )
                                            )}
                                        </div>
                                    </main>

                                    <div>
                                        <Pagination/>
                                    </div>
                                </main>
                            </div>    
                        </div>
                    </body>
                </div>
            </div>
  );
}
export default AdminiAnalista;