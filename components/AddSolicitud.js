import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import aceptado from '../assets/images/checkGreen.png';
import rechazado from '../assets/images/close.png';
import revision from '../assets/images/googleDocs.png';
import Loading from './Loading'

let usuario = [];
let estado; 
let buro = '';
function AddSolicitud(props){
    usuario = props.location.query.user;

    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const [exito, setExito] = useState(null);
    const [app, setApp] = useState({
      credito_solicitud: '', 
      tipo_de_credito_solicitado: '', 
      capacidad_de_pago: '',
  });

  // usuario = props.location.query.user;

  const handleChange = (event)=> {
    const {name, value} = event.target;
    setApp({
            ...app,
            [name]: value
    })
}

    const handleStatus = (tipo_de_credito_solicitado) => {
        setApp({
            ...app,
            tipo_de_credito_solicitado: tipo_de_credito_solicitado
        });
    }
    
    function checkDoc(props)
    {
        if (props === true)
        buro = 'Completado';
        else if (props === false)
        buro = 'Faltante';
    }

  const editData = () => {
    console.log(app);
    axios.post(`http://localhost:5000/client-applications`, app)
        .then(response => {
            console.log('res from server: ', response)
        })
        .catch(err => {
            console.log(err);
        })
    }


        return(
            <div>
              <br/>
              <body class="bg-light">
                
                <div class="container">
                  <main>
                  
                    <div class="py-4 text-center"
                      {...checkDoc(usuario.firma_buro_credito)}>
                        <h2>Solicitud {usuario.credit_requestID}</h2>
                    </div>
                
                    <div class="row g-5">
                      <div class="col-md-5 col-lg-4 order-md-last">
                        <h4 class="d-flex justify-content-between align-items-center mb-3">
                          <span >Información del solicitante</span>
                        </h4>
                        <ul class="list-group mb-3">
                          <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                              <h6 class="my-0">{usuario.nombre} {usuario.apellido_paterno} {usuario.apellido_materno}</h6>
                              <small class="text-muted">Nombre del solicitante</small>
                            </div>
                            <span class="text-muted">ID: {usuario.clientID}</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                              <h6 class="my-0">{usuario.telefono}</h6>
                              <small class="text-muted">Teléfono</small>
                            </div>
                          </li>
                          <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                              <h6 class="my-0">{usuario.direccion}</h6>
                              <small class="text-muted">Dirección</small>
                            </div>
                          </li>
                          <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div class="col">
                              <h6 class="my-0">Referencias</h6>
                              <small id="salto" class="text-muted">{usuario.referencia1}</small>
                              <small id="salto" class="text-muted">{usuario.referencia2}</small>
                            </div>
                            <div id="aladerecha">
                              <h6 class="my-0">Teléfono</h6>
                              <span id="salto" class="text-muted">{usuario.telefono_ref1}</span>
                              <span id="salto" class="text-muted">{usuario.telefono_ref2}</span>
                            </div>
                            
                          </li>
                          
                          <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div id="salto">
                              <h6 class="my-0">Compromiso</h6>
                              <small id="salto" class="text-muted">{usuario.compromiso1}</small>
                              <small id="salto" class="text-muted">{usuario.compromiso2}</small>
                              <small id="salto" class="text-muted">{usuario.compromiso3}</small>
                            </div >
                            <div id="aladerecha">
                              <h6 class="my-0">Fecha de contacto</h6>
                              <span id="salto" class="text-muted">{usuario.fecha_contacto1}</span>
                              <span id="salto" class="text-muted">{usuario.fecha_contacto2}</span>
                              <span id="salto" class="text-muted">{usuario.fecha_contacto3}</span>
                            </div>
                          </li>
    
    
                          <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                              <h6 class="my-0">Antiguedad</h6>
                              <small class="text-muted">Desde cuando el cliente pertenece a Zorro</small>
                            </div>
                            <span class="text-muted">{usuario.fecha_ingreso_zorro}</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                              <h6 class="my-0">INE</h6>
                              <small class="text-muted">Código de Identificación de Credencial (CIC)</small>
                            </div>
                            <span class="text-muted">{usuario.INE}</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                              <h6 class="my-0">Firma de buró de crédito</h6>
                              <small class="text-muted">Documento</small>
                            </div>
                            <span class="text-muted">{buro}</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                              <h6 class="my-0">Fecha de solicitud</h6>
                            </div>
                            <span class="text-muted">{usuario.fecha_solicitud}</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                              <h6 class="my-0">Analista asignado</h6>
                              <small class="text-muted">Quien da seguimiento de la solicitud</small>
                            </div>
                            <span class="text-muted">ID: {usuario.analystID}</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between bg-light">
                            <div class="text-success">
                              <h6 class="my-0">Estatus de solicitud</h6>
                              <img id="centrado" class="img-responsive" src={revision} alt="estatus" width="50"/> {/* estatus imagen */}
                            </div>
                            <span class="text-muted" class="text-success">revisión</span>
    
                          </li>
                        </ul>
                        
                      </div>
                      
    
    
    
                      
                      <div class="col-md-7 col-lg-8">
                        <form class="needs-validation" novalidate>
                          <div class="row g-3">
                
                            <div class="col-sm-6">
                              <h4>Tipo de crédito solicitado</h4>
                              <div class="form-check">
                                <input id="flexRadioDefault1" name="tipo_de_credito_solicitado" type="radio" class="form-check-input" required onClick={() =>handleStatus('simple')}/>
                                <label class="form-check-label" for="flexRadioDefault1">Simple</label>
                                <div class="invalid-feedback">
                                    Este campo es requerido
                                </div>
                              </div>
                              <div class="form-check">
                                <input id="flexRadioDefault2" name="tipo_de_credito_solicitado" type="radio" class="form-check-input" required onClick={() =>handleStatus('revolvente')}/>
                                <label class="form-check-labe2" for="flexRadioDefault2">Revolvente</label>
                                <div class="invalid-feedback">
                                    Este campo es requerido
                                </div>
                              </div>
                            </div>
                
                            <div class="col-12">
                              <label for="username" class="form-label">Cantidad de crédito solicitado</label>
                              <div class="input-group has-validation">
                                <span class="input-group-text">$</span>
                                <input type="text" class="form-control" placeholder="0.00" required name="credito_solicitud" onChange={e => handleChange(e)}/>
                                <span class="input-group-text">.00</span>
                                <div class="invalid-feedback">
                                    La cantidad es requerida
                                </div>
                              </div>
                            </div>
    
                            <div class="col-12">
                              <label for="username" class="form-label">Capacidad de pago</label>
                              <div class="input-group has-validation">
                                <span class="input-group-text">$</span>
                                <input type="text" class="form-control" placeholder="0.00" required name="capacidad_de_pago" onChange={e => handleChange(e)}/>
                                <span class="input-group-text">.00</span>
                                <div class="invalid-feedback">
                                    La cantidad es requerida
                                </div>
                              </div>
                            </div>
                            
                
                          </div>
                            
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
                                        <h4 class="alert-heading">Se ha iniciado la solicitud con éxito</h4>
                                        <p>Ahora podrás consultarla desde la vista principal</p>
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

                            <div class="d-grid gap-2 d-md-block text-center">
                              
                                  <button type="button" class="w-50 btn btn-lg btn-outline-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id = "btp" onClick={editData}>Guardar</button>
                              
                            </div>
                        </form>
                      </div>
                    </div>
                  </main>
                </div>
                <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
                <script src="form-validation.js"></script>
              </body>
            </div>
            
               
          );
    }
export default AddSolicitud;