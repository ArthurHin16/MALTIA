import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading'


function AddProspecto(props){

    const [stores, setStores] = useState([]);
    const [status, setStatus] = useState('pristine');
    const [app, setApp] = useState({
        nombre: '', 
        apellido_paterno: '', 
        apellido_materno: '', 
        compromiso1: '', 
        compromiso2: '', 
        compromiso3: '',
        fecha_contacto1: '',
        fecha_contacto2: '',
        fecha_contacto3: '',
        telefono: '',
        storeID: '',
    });

    useEffect(()=>{
        console.log('props on edit: ', props);
        setApp(props.employee);
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
        setApp({
                ...app,
                [name]: value
        })
    }
    const editData = () => {
        console.log('pp', app);
        axios.post(`http://localhost:5000/leaflets`, app)
            .then(response => {
                console.log('res from server: ', response)
                console.log('app', app);

            })
            .catch(err => {
                console.log(err);
            })
    }

if(status == 'pristine' || status === 'dirty'){
    return(
        <div>
            <h3 id="textbt">Prospecto</h3>
            <br/>

            <form class="bg-light needs-validation" novalidate>
                <br/>
                <div >

                    <div class="row">
                        <div class="col mb-3">
                            <label class="h4">Nombre</label>
                            <input type="text" class="form-control" name="nombre" required onChange={e => handleChange(e)}/>
                            <div class="invalid-feedback">
                                Este campo es requerido
                            </div>
                        </div>
                        <div class="col mb-3">
                            <label class="h4">Apellido paterno</label>
                            <input type="text" class="form-control" name="apellido_paterno" required onChange={e => handleChange(e)}/>
                            <div class="invalid-feedback">
                                Este campo es requerido
                            </div>
                        </div>
                        <div class="col mb-3">
                            <label class="h4">Apellido materno</label>
                            <input type="text" class="form-control" name="apellido_materno" onChange={e => handleChange(e)}/>
                        </div>
                    </div>

                    <div class="col mb-3">
                        <label class="h4">Teléfono</label>
                        <div class="input-group has-validation col-xs-4">
                            <input type="tel" class="form-control" placeholder="10 digitos" required name="telefono" onChange={e => handleChange(e)}/>
                            <div class="invalid-feedback">
                                Este campo es requerido
                            </div>
                        </div>
                        
                    </div>
                    
                    {/* COMRPOMISOS */}
                    <div class="row g-6 mb-3">
                        <div class="col-sm-6">
                            <label class="h5">Compromiso</label>
                            <input type="text" class="form-control" name="compromiso1" required onChange={e => handleChange(e)}/>
                            <div class="invalid-feedback">
                                Este campo es requerido
                            </div>
                        </div>
                        <div class="col-sm mb-3">
                                <label class="h5">Fecha de contacto</label>
                                <input type="date" class="form-control" name="fecha_contacto1" required onChange={e => handleChange(e)}/>
                                <div class="invalid-feedback">
                                    Este campo es requerido
                                </div>
                        </div>  
                    </div>
                    {/* COMRPOMISOS */}
                    <div class="row g-6 mb-3">
                        <div class="col-sm-6">
                            <label class="h5">Compromiso</label>
                            <input type="text" class="form-control" name="compromiso2" required onChange={e => handleChange(e)}/>

                        </div>
                        <div class="col-sm mb-3">
                                <label class="h5">Fecha de contacto</label>
                                <input type="date" class="form-control" name="fecha_contacto2" required onChange={e => handleChange(e)}/>
                        </div>  
                    </div>
                    {/* COMRPOMISOS */}
                    <div class="row g-6 mb-3">
                        <div class="col-sm-6">
                            <label class="h5">Compromiso</label>
                            <input type="text" class="form-control" name="compromiso3" required onChange={e => handleChange(e)}/>

                        </div>
                        <div class="col-sm mb-3">
                                <label class="h5">Fecha de contacto</label>
                                <input type="date" class="form-control" name="fecha_contacto3" required onChange={e => handleChange(e)}/>
                        </div>  
                    </div>

                    <label class="h5">Tienda</label>
                        <select class="form-select" aria-label=".form-select-sm example" name="storeID" onChange={e => handleChange(e)}>
                            <option selected>Selecciona la tienda</option>
                            {stores.map((stores) => (
                                <option key={stores.storeID} value={stores.storeID}>{stores.storeID} {stores.nombre}</option>
                            )
                            )}
                        </select>

                        <br/>

                        <hr class="my-4"/>
                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">GUARDADO</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                    <div class="alert alert-success" role="alert">
                                        <h4 class="alert-heading">Se ha añadido el prospecto con éxito</h4>
                                        <p>Ahora podrás consultarlo desde la vista principal</p>
                                        <hr/>
                                        <p class="mb-0">Gracias</p>
                                    </div>
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cerrar</button>
                                    </div>
                                </div>
                                </div>
                            </div>

                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                         
                            <button type="button" class="btn btn-lg btn-outline-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="btp" onClick={editData}>Guardar</button>
                        
                    </div>

                </div>
                
            
            </form>
        </div>
        );
    }

}

export default AddProspecto;