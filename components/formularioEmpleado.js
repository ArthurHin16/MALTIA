import React, {useEffect, useState } from 'react'
import axios from 'axios';
const bootstrap = require('bootstrap');

function FormularioEmpleado(props){
    const [ estatus, setEstatus ] = useState('pristine');
    const [ employee, setEmployee ] = useState({
        nombre: '', 
        apellido_paterno: '', 
        apellido_materno: '', 
        correo: '', 
        status: '', 
        telefono: '',  
        puesto: '', 
        password: ''
        
    });


    useEffect(()=>{
        axios.get(`http://localhost:5000/analysts/${props.id}`) 
                .then((result) => {
                    console.log('resut en padre: ', result.data.data)
                    setEmployee(result.data.data)
                })
                .catch((error) => {
                    console.log(error)
                });
        
    }, []);

    function handleChange(event){
        let newEmployee = {
            ...employee,
            [event.target.name]: event.target.value,
        };
        setEmployee(newEmployee)
        setEstatus('dirty')
    }

    function handleSave(){
        console.log('button');
        axios.patch(`http://localhost:5000/employees/${props.id}`, employee)
        .then((result) => {
            console.log(result.data.data);
            props.onSave(result.data.data)
            setEstatus('pristine')
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleStatus = (status) => {
        setEmployee({
            ...employee,
            status: status
        });
    }

    if(estatus == 'pristine' || estatus === 'dirty'){
        return(
            <form onSubmit={handleSave}>
                <div class="row">
                    <div class="col">
                        <label>Nombre</label>
                        <input type="text" class="form-control" name="nombre" defaultValue={employee.nombre} onChange={(event) => handleChange(event)}/>
                    </div>
                    <div class="col">
                        <label>Apellido paterno</label>
                        <input type="text" name="apellido_paterno" class="form-control" defaultValue={employee.apellido_paterno} onChange={(event) => handleChange(event)}/>
                    </div>
                    <div class="col">
                        <label>Apellido materno</label>
                        <input type="text" name="apellido_materno" class="form-control" defaultValue={employee.apellido_materno} onChange={(event) => handleChange(event)}/>
                    </div>
                </div>

                <div class="col">
                    <label>Puesto</label>
                    <input type="text" name="puesto" class="form-control" readonly = "readonly" defaultValue={employee.puesto} onChange={(event) => handleChange(event)}/>
                    
                    <label>Estatus</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="activo" id="flexRadioDefault1" checked={employee.status==='activo'}  onClick={() =>handleStatus('activo')}/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            Activo
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="inactivo" id="flexRadioDefault2" checked={employee.status==='inactivo'}  onClick={() =>handleStatus('inactivo')}/>
                        <label class="form-check-label" for="flexRadioDefault2">
                            Inactivo 
                        </label>
                    </div>


                    <label>Teléfono</label>
                    <input type="tel" name="telefono" class="form-control" defaultValue={employee.telefono} onChange={(event) => handleChange(event)}/>
                </div>

                <div class="row">
                    <div class="col">
                        <label>Correo </label>
                        <input type="email" name="correo" class="form-control" defaultValue={employee.correo} onChange={(event) => handleChange(event)}/>
                    </div>
                    <div class="col">
                        <label>Contraseña</label>
                        <input type="password" name="password" class="form-control" readOnly defaultValue={employee.password} onChange={(event) => handleChange(event)}/>
                    </div>
                </div>
                
                <br></br>

                <hr class="my-4"/>
                  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <div class="alert alert-success" role="alert">
                                <h4 class="alert-heading">¡Empleado Actualizado!</h4>
                                <p>Se han efectuado con éxito los cambios al perfil</p>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                          </div>
                        </div>
                    </div>

                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button type="button" class="btn btn-lg btn-outline-light" id = "btp" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                     disabled={estatus === 'pristine'} onClick={handleSave}>Guardar</button>
                </div>

            </form>
        );

    }
    
}

export default FormularioEmpleado;