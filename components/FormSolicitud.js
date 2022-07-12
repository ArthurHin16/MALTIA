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
function FormSolicitud(props){

  usuario = props.location.query.user;

    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const [exito, setExito] = useState(null);
    const [user, setUser] = useState({
      credito_solicitud: '', 
      tipo_de_credito_solicitado: '', 
      capacidad_de_pago: '',
  });

  // usuario = props.location.query.user;

    useEffect(()=>{
        axios.get(`http://localhost:5000/client-applications/${props.match.params.id}`)
        .then((result)=>{
            if(result.data.data[0][0]){
            setUser(result.data.data[0][0])
            setStatus('resolved')} 
            else
            setStatus('error')
        })
        .catch((error)=>{
            setError(error)
            setStatus('error')
        })
    }, [])

    function checkStatus(props)
    {
        if (props === 'aceptado')
        estado = aceptado;
        else if (props === 'rechazado')
        estado = rechazado;
        else if (props === 'revision')
        estado = revision;
    }
    function checkDoc(props)
    {
        if (props === true)
        buro = 'Completado';
        else if (props === false)
        buro = 'Faltante';
    }

    const handleChange = (event)=> {

      const {name, value} = event.target;
      console.log('event.target', event.target)
      
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
  const editData = async (props) => {
      console.log('user', user)
      await axios.patch(`http://localhost:5000/client-applications/${usuario.credit_requestID}`, user)
        .then(response => {
          if(response.status == 200){
              setStatus('resolved')
              setExito('exito')
            }
            else {
              setError(error)
              setStatus('error')
            }
        })
        .catch(error => {
          setError(error)
          setStatus('error')
        })
      }


    if(status === 'idle' || status === 'loading' ){
        return <Loading />
    }
    if(status === 'error') {
      return(
          <div class="alert alert-danger text-center" role="alert">
              Ups, al parecer no existe la solicitud que buscabas
          </div>
          );
    }
    if(status === 'exito') {
      return(
        <div class="alert alert-success text-center" role="alert">
            ¡Datos actualizados correctamente!
        </div>
        );
      }
    if ( status === 'resolved'){
      return(
        <div>
          <br/>
          <body class="bg-light">
            
            <div class="container">
              <main>
              
                <div class="py-4 text-center"
                  {...checkStatus(user.estatus_de_solicitud)}
                  {...checkDoc(user.firma_buro_credito)}>
                    <h2>Solicitud {user.credit_requestID}</h2>
                </div>
            
                <div class="row g-5">
                  <div class="col-md-5 col-lg-4 order-md-last">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                      <span >Información del solicitante</span>
                    </h4>
                    <ul class="list-group mb-3">
                      <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                          <h6 class="my-0">{user.nombre} {user.apellido_paterno} {user.apellido_materno}</h6>
                          <small class="text-muted">Nombre del solicitante</small>
                        </div>
                        <span class="text-muted">ID: {user.clientID}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                          <h6 class="my-0">{user.telefono}</h6>
                          <small class="text-muted">Teléfono</small>
                        </div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                          <h6 class="my-0">{user.direccion}</h6>
                          <small class="text-muted">Dirección</small>
                        </div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div class="col">
                          <h6 class="my-0">Referencias</h6>
                          <small id="salto" class="text-muted">{user.referencia1}</small>
                          <small id="salto" class="text-muted">{user.referencia2}</small>
                        </div>
                        <div id="aladerecha">
                          <h6 class="my-0">Teléfono</h6>
                          <span id="salto" class="text-muted">{user.telefono_ref1}</span>
                          <span id="salto" class="text-muted">{user.telefono_ref2}</span>
                        </div>
                        
                      </li>
                      
                      <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div id="salto">
                          <h6 class="my-0">Compromiso</h6>
                          <small id="salto" class="text-muted">{user.compromiso1}</small>
                          <small id="salto" class="text-muted">{user.compromiso2}</small>
                          <small id="salto" class="text-muted">{user.compromiso3}</small>
                        </div >
                        <div id="aladerecha">
                          <h6 class="my-0">Fecha de contacto</h6>
                          <span id="salto" class="text-muted">{user.fecha_contacto1}</span>
                          <span id="salto" class="text-muted">{user.fecha_contacto2}</span>
                          <span id="salto" class="text-muted">{user.fecha_contacto3}</span>
                        </div>
                      </li>


                      <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                          <h6 class="my-0">Antiguedad</h6>
                          <small class="text-muted">Desde cuando el cliente pertenece a Zorro</small>
                        </div>
                        <span class="text-muted">{user.fecha_ingreso_zorro}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                          <h6 class="my-0">INE</h6>
                          <small class="text-muted">Código de Identificación de Credencial (CIC)</small>
                        </div>
                        <span class="text-muted">{user.INE}</span>
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
                        <span class="text-muted">{user.fecha_solicitud}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                          <h6 class="my-0">Analista asignado</h6>
                          <small class="text-muted">Quien da seguimiento de la solicitud</small>
                        </div>
                        <span class="text-muted">ID: {user.analystID}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between bg-light">
                        <div class="text-success">
                          <h6 class="my-0">Estatus de solicitud</h6>
                          <img id="centrado" class="img-responsive" src={estado} alt="estatus" width="50"/> {/* estatus imagen */}
                        </div>
                        <span class="text-muted" class="text-success">{user.estatus_de_solicitud}</span>

                      </li>
                    </ul>
                    
                  </div>


                  
                  <div class="col-md-7 col-lg-8">
                    <form class="needs-validation" novalidate>
                      <div class="row g-3">
            
                        <div class="col-sm-6">
                          <h4>Tipo de crédito solicitado</h4>
                          <div class="form-check">
                            <input id="flexRadioDefault1" name="activo" type="radio" class="form-check-input" required checked={user.status==='activo'}/>
                            <label class="form-check-label" for="flexRadioDefault1">Simple</label>
                            <div class="invalid-feedback">
                                Este campo es requerido
                            </div>
                          </div>
                          <div class="form-check">
                            <input id="flexRadioDefault2" name="activo" type="radio" class="form-check-input" required onClick={() =>handleStatus('inactivo')} checked={user.status==='inactivo'}/>
                            <label class="form-check-label" for="flexRadioDefault2">Revolvente</label>
                            <div class="invalid-feedback">
                                Este campo es requerido
                            </div>
                          </div>
                        </div>
            
                        <div class="col-12">
                          <label for="username" class="form-label">Cantidad de crédito solicitado</label>
                          <div class="input-group has-validation">
                            <span class="input-group-text">$</span>
                            <input type="text" class="form-control" placeholder="0.00" required defaultValue={user.credito_solicitud} name="credito_solicitud" onChange={e => handleChange(e)}/>
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
                            <input type="text" class="form-control" placeholder="0.00" required defaultValue={user.capacidad_de_pago} name="capacidad_de_pago" onChange={e => handleChange(e)}/>
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
                                        <h4 class="alert-heading">Se ha editado la solicitud con éxito</h4>
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
    
}

export default FormSolicitud;