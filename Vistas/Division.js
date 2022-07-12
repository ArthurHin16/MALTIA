import React from 'react';
import '../assets/css/headers.css'
import Header from '../components/header';

const bootstrap = require('bootstrap');

function Division() {

  return (
            <div lang="en">
                <div>
                    <body>    
                        <div>
                            <Header/>
                        </div>
                        <div class="container-fluid">

                            <div class="row">
                                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                                    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom"> {/*Componente filtro administrador*/}
                                        <h2>VISTAS</h2>
                                    </div>

                                    <main> 
                                        <a href = "/Administrador">VISTA Administrador</a>
                                        <br></br>
                                        <a href = "/Analista">VISTA Analista</a>
                                        <br></br>
                                        <a href = "/Asesor">VISTA Asesor</a>
                                    </main>
                                </main>
                            </div>    
                        </div>
                    </body>
                </div>
            </div>
  );
}
export default Division;