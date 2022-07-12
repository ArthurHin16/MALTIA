import React, { useEffect, useState } from 'react'
import axios from 'axios';
const bootstrap = require('bootstrap');

function AddAsesor(props){

    const [stores, setStores ] = useState([]);
    const [user, setUser] = useState({
        nombre: '', 
        apellido_paterno: '', 
        apellido_materno: '',
        correo: '',
        status: '', 
        telefono: '', 
        puesto: 'asesor',
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

    const editData = () => {
        console.log(user);
        axios.post(`http://localhost:5000/employees/signup`, user)
            .then(response => {
                console.log('res from server: ', response)
            })
            .catch(err => {
                console.log(err);
            })
    }


    return(
        <form>
            <div class="row">
                <div class="col">
                    <label>Nombre</label>
                    <input type="text" class="form-control"  name="nombre" onChange={e => handleChange(e)}/>
                </div>
                <div class="col">
                    <label>Apellido paterno</label>
                    <input type="text" class="form-control" name="apellido_paterno" onChange={e => handleChange(e)}/>
                </div>
                <div class="col">
                    <label>Apellido materno </label>
                    <input type="text" class="form-control" name="apellido_materno" onChange={e => handleChange(e)}/>
                </div>
            </div>

            <div class="col"> 
                <label>Puesto <b>(¡Seleccione asesor!)</b></label>
                <select id = "puesto" name = "puesto" class="form-select form-select-sm" aria-label=".form-select-sm example" onChange={e => handleChange(e)}>
                    <option>Selecciona el puesto</option>
                    <option>asesor</option>
                 </select>

                <label>Tiendas</label>
                <select id = "caja" name = "storeID" class="form-select form-select-sm" aria-label=".form-select-sm example" onChange={e => handleChange(e)}>
                    <option>Selecciona la tienda</option>
                    {stores.map((stores) => (
                        <option key={stores.storeID} value={stores.storeID}>{stores.storeID} {stores.nombre}</option>
                    )
                    )}
                 </select>

                 <label>Estatus</label>
                 <div class="form-check">
                    <input class="form-check-input" type="radio" name="activo" id="flexRadioDefault1"  onClick={() =>handleStatus('activo')}/>
                    <label class="form-check-label" for="flexRadioDefault1">
                        Activo
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={() =>handleStatus('inactivo')}/>
                    <label class="form-check-label" for="flexRadioDefault2">
                        Inactivo
                    </label>
                </div>


                <label>Teléfono</label>
                <input type="tel" name="telefono" class="form-control" onChange={e => handleChange(e)}/>
            </div>

            <div class="row">
                <div class="col">
                    <label>Correo *</label>
                    <input type="email"  name ="correo" class="form-control" onChange={e => handleChange(e)}/>
                </div>
                <div class="col">
                    <label>Contraseña *</label>
                    <input type="password" name="password" class="form-control" onChange={e => handleChange(e)}/>
                </div>
            </div>

            <hr class="my-4"/>
                  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <div class="alert alert-success" role="alert">
                                <h4 class="alert-heading">¡Empleado Agregado!</h4>
                                <p>Se ha agregado al nuevo empleado con éxito.</p>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                          </div>
                        </div>
                |</div>
            
            <br></br>

            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                <button type="button" class="btn btn-lg btn-outline-light" id = "btp" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={editData}>Guardar</button>
            </div>

        </form>
    );
}

export default AddAsesor;