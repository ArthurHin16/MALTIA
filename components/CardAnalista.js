import React from 'react';
import { Link } from 'react-router-dom';
import profile from '../assets/images/profile.png'; 
const bootstrap = require('bootstrap');

function CardAnalista(props){
    const {employeeID, nombre, apellido_paterno, apellido_materno, correo, status, telefono, puesto} = props.employees;
    return(
        
                <div class="card mb-4 rounded-3 shadow-sm">
                    <div class="card-body">
                        <img class="img-responsive" src={profile} alt="Logo" width="50%"/>
                        <ul class="list-unstyled mt-3 mb-4">
                            <li>{`${nombre} ${apellido_paterno} ${apellido_materno}`}</li>
                            <li>{`ID: ${employeeID}`}</li>
                            <li>{`Puesto: ${puesto}`}</li>
                            <li>{`Estatus: ${status}`}</li>
                            <li>{`Teléfono: ${telefono}`}</li>
                            <li>{`Correo: ${correo}`}</li>
                        </ul>
                        <Link  to = { `/Admin_addAnalista/${employeeID}` }><button type="button" class="w-50 btn btn-lg btn-outline-light" id = "btp">Editar</button></Link>
                    </div>
                </div>
                    
        
    );
}
export default CardAnalista;