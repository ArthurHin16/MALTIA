import React, { useEffect, useState } from 'react'
import axios from 'axios';
const bootstrap = require('bootstrap');

function EditEmpleado(props){
    const {
        employeeID,
        nombre, 
        apellido_paterno, 
        apellido_materno,
        correo,
        estatus, 
        telefono, 
        puesto,
        password,
        storeID,
    } = props.employee

    const [stores, setStores ] = useState([]);
    const [user, setUser] = useState({
        nombre: '', 
        apellido_paterno: '', 
        apellido_materno: '',
        correo: '',
        status: '', 
        telefono: '', 
        puesto: '',
        password: '',
        storeID: '',
    });
    useEffect(()=>{
        console.log('props on edit: ', props);
        setUser(props.employee);
        axios.get("http://localhost:5000/stores/")
            .then((result) => {
                setStores(result.data.data)
                console.log(result.data.data)

            })
            .catch((error) => {
                console.log(error)
            })
    },[])


    const handleChange = (event)=> {
        const {name, value} = event.target;
        setUser({
                ...user,
                [name]: value
        })
    }

    const handleStatus = (status) => {
        setUser({
            ...user,
            status: status
        });
    }
    /*Utilizar para agregar un nuevo usuario
    const action = user.id ? 'patch' : 'post';
    const url = user.id ? `http://localhost:5000/employees/editar-asesor/${employeeID}` : `http://localhost:5000/employees/crear-asesor`;*/

    //Cambiar los valores de entrada defaultValue, comentar el axios, ver el console.log y poner la data en patch
    const editData = () => {
        console.log(user);
        axios.patch(`http://localhost:5000/employees/editar-asesor/${employeeID}`, user)
            .then(response => {
                console.log('res from server: ', response)
            })
            .catch(err => {
                console.log(err);
            })
    }
    
    return(
        <form class="bg-light">
            <br/>
        <div class="container"></div>
            <div class="row">
                <div class="col">
                    <label>Nombre</label>
                    <input type="text" class="form-control" defaultValue={nombre} name="nombre" onChange={e => handleChange(e)}/>
                </div>
                <div class="col">
                    <label>Apellido paterno</label>
                    <input type="text" class="form-control" defaultValue={apellido_paterno} name="apellido_paterno" onChange={e => handleChange(e)}/>
                </div>
                <div class="col">
                    <label>Apellido materno </label>
                    <input type="text" class="form-control" defaultValue={apellido_materno} name="apellido_materno" onChange={e => handleChange(e)}/>
                </div>
            </div>

            <div class="col"> 
                <label>Puesto</label>
                <input type="text" class="form-control" defaultValue={puesto}  onChange={e => handleChange(e)} readOnly/>
               
                <label>Tienda</label>
                <select id = "caja" name = "storeID" class="form-select form-select-sm" aria-label=".form-select-sm example" value={user.storeID} onChange={e => handleChange(e)}>
                    <option>Selecciona la tienda</option>
                    {stores.map((stores) => (
                        <option key={stores.storeID} value={stores.storeID}>{stores.storeID} {stores.nombre}</option>
                    )
                    )}
                 </select>

                 <label>Estatus</label>
                 <div class="form-check">
                    <input class="form-check-input" type="radio" name="activo" id="flexRadioDefault1"  onClick={() =>handleStatus('activo')} checked={user.status==='activo'}/>
                    <label class="form-check-label" for="flexRadioDefault1">
                        Activo
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={() =>handleStatus('inactivo')} checked={user.status==='inactivo'}/>
                    <label class="form-check-label" for="flexRadioDefault2">
                        Inactivo
                    </label>
                </div>


                <label>Teléfono</label>
                <input type="tel" class="form-control" defaultValue={telefono} onChange={e => handleChange(e)}/>
            </div>

            <div class="row">
                <div class="col">
                    <label>Correo</label>
                    <input type="email" class="form-control" defaultValue={correo} onChange={e => handleChange(e)}/>
                </div>
                <div class="col">
                    <label>Contraseña</label>
                    <input type="password" class="form-control" readOnly defaultValue={password} onChange={e => handleChange(e)}/>
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
                |</div>

            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                <button type="button" class="btn btn-lg btn-outline-light" id = "btp" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={editData}>Guardar</button>
            </div>

        </form>
    );
}

export default EditEmpleado;