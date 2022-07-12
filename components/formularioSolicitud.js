import React, {useState, useEffect} from 'react';
import reporte from '../assets/images/reporte.png';
import solicitud from '../assets/images/solicitud.png';
import checkGreen from '../assets/images/checkGreen.png';
import close from '../assets/images/close.png';
import googleDocs from '../assets/images/googleDocs.png';
import Loading from './Loading';
import axios from 'axios';


export function getCurrentDate(separator='-'){

  let myCurrentDate = new Date()
  let date = myCurrentDate.getDate();
  let month = myCurrentDate.getMonth() + 1;
  let year = myCurrentDate.getFullYear();
  
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
  }


function FormularioS(props){
  const [status, setStatus] = useState('pristine');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(props.user);
  const  { 
      credit_requestID,
      fecha_alta_ISI,
      tipo_de_credito_solicitado,
      estatus_de_solicitud,
      credito_solicitud,
      fecha_solicitud,
      fecha_ingreso_zorro,
      capacidad_de_pago,
      tipo_credito_autorizado,
      credito_autorizado,
      estatus_credito,
      credito_dispuesto,
      fecha_autorizacion,
      fecha_disposicion

  } = user;

function handleChange(event){
 let newUser = {
    ...user,
    [event.target.name]: event.target.value,
    
  };
  setUser(newUser);
  setStatus('dirty')
}

function handleSave(event){
  event.preventDefault()

  setStatus('loading')
  setError(null)

  axios.patch(`http://localhost:5000/client-applications/${credit_requestID}`,{
    body: JSON.stringify(user),
    headers : { 'Content-Type': 'application/json; charset=UTF-8',}
  })
  .then((result) => {
    props.onSave(setUser(result.data.data))
    setStatus('pristine')
  })
  .catch(error => {
    setError(error)
    setStatus('error')
  })
}

const editData = (event) => {
  event.preventDefault();
  setStatus('dirty')
  console.log(user);
  axios.patch(`http://localhost:5000/client-applications/${credit_requestID}`, user)
      .then(response => {
          console.log('res from server: ', response)
          setStatus('pristine')
      })
      .catch(err => {
          console.log(err);
      })
}



const handleStatus = (event) => {

  if (event === 'aceptado'){
    setUser({
      ...user,
      fecha_autorizacion: getCurrentDate(),
      estatus_de_solicitud: event,
  });
  }
  else {
    setUser({
      ...user,
      estatus_de_solicitud: event,
      
  });
  }

  setStatus('dirty')
}

const handleStatus2 = (event) => {
  setUser({
      ...user,
      tipo_credito_autorizado: event,
  });
  setStatus('dirty')
}

const handleStatus3 = (event) => {
  if(event === 'ISI')
  {
    setUser({
      ...user,
      fecha_alta_ISI: getCurrentDate(),
  }); 
  } else if (event === 'DP'){
    setUser({
      ...user,
      fecha_disposicion: getCurrentDate(),
  });

  }

}

if(status === 'error') {
  return(
      <div class="alert alert-danger text-center" role="alert">
          ¡Ups!, al parecer no existe la solicitud que buscabas
      </div>
      );
}


if(status === 'idle' || status === 'loading' ){
  return <Loading />
}


    return(

        <body class="bg-light">
    
        <div class="container">
          <main>
            <div class="py-5 text-center">
              <h2>Actualizando solicitud</h2>
            </div>
        
            <div class="row g-5">
              <div class="col-md-5 col-lg-4 order-md-last">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                  <span >Información del solicitante </span>
                </h4>
                <ul class="list-group mb-3">
                  <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 class="my-0">Crédito solicitado</h6>
                      <small class="text-muted">Cantidad que el cliente solicita</small>
                    </div>
                    <span class="text-muted">${credito_solicitud}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 class="my-0">Tipo de crédito solicitado</h6>
                    </div>
                    <span class="text-muted">{tipo_de_credito_solicitado}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 class="my-0">Antigüedad</h6>
                      <small class="text-muted">Desde cuando el cliente pertenece a Zorro</small>
                    </div>
                    <span class="text-muted">{fecha_ingreso_zorro}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between bg-light">
                    <div class="text-success">
                      <h6 class="my-0">Capacidad de pago</h6>
                      <small></small>
                    </div>
                    <span class="text-success">${capacidad_de_pago}</span>
                  </li>
                </ul>

              </div>
              <div class="col-md-7 col-lg-8">
                <form class="needs-validation" novalidate>
                  <div class="row g-3">
                    
                    <div class="col-sm-6">
                      <h4>Estatus del crédito</h4>
                      <div class="form-check">
                        <input id="credit" name="estado" type="radio" id="aceptado"  class="form-check-input"  onClick={() =>handleStatus('aceptado')}  checked={estatus_de_solicitud==='aceptado'}  required/>
                        <label class="form-check-label" for="aceptado">Aceptado</label>
                      </div>
                      <div class="form-check">
                        <input id="debit" name="estado" type="radio" id="rechazado" class="form-check-input" onClick={() =>handleStatus('rechazado')} checked={estatus_de_solicitud==='rechazado'} required/>
                        <label class="form-check-label" for="rechazado">Rechazado</label>
                      </div>
                      <div class="form-check">
                        <input id="paypal" name="estado" type="radio" id="revision" class="form-check-input"  onClick={() =>handleStatus('revision')}  checked={estatus_de_solicitud==='revision'} required/>
                        <label class="form-check-label" for="revision">En revisión</label>
                      </div>
                    </div>
        
                    <div class="col-sm-6">
                      <h4>Tipo del crédito </h4>
                      <div class="form-check">
                        <input id="credit" name="tipo" type="radio" class="form-check-input" onClick={() =>handleStatus2('revolvente')}    checked={tipo_credito_autorizado==='revolvente'} required/>
                        <label class="form-check-label" for="credit">revolvente</label>
                      </div>
                      <div class="form-check">
                        <input id="debit" name="tipo" type="radio" class="form-check-input" onClick={() =>handleStatus2('simple')}    checked={tipo_credito_autorizado==='simple'} required/>
                        <label class="form-check-label" for="debit">simple</label>
                      </div>
                        <div class="invalid-feedback">
                          La cantidad es requerida
                        </div>
                    </div>
        
                    <div class="col-12">
                      <label htmlFor="credito_autorizado" class="form-label ">Cantidad aprobada</label>
                      <div class="input-group has-validation">
                      <span class="input-group-text">$</span>
                        <input class="form-control "
                           name= "credito_autorizado"
                           type="number"
                           value = {credito_autorizado}
                           required
                           onChange={handleChange} 
                          />
                        <span class="input-group-text">.00</span>
                      <div class="invalid-feedback">
                          La cantidad es requerida
                        </div>
                      </div>
                    </div>
        
                    <div class="col-sm-6">
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={() =>handleStatus3('ISI')}  checked={fecha_alta_ISI}/>
                        <label class="form-check-label" for="flexSwitchCheckDefault">Alta en ISI</label>
                      </div>
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={() =>handleStatus3('DP')}   checked={fecha_disposicion}/>
                        <label class="form-check-label" for="flexSwitchCheckDefault">Disposición de crédito</label>
                      </div>
                    </div>
                    <hr/>
                    <div class="row">
                      <div class ="col">
                          <label>Fecha alta ISI</label>
                          <input class="form-control"  value= {fecha_alta_ISI} disabled/>
                      </div>  
                      <div class ="col">
                          <label>Fecha de autorización</label>
                          <input class="form-control"  value= {fecha_autorizacion} disabled/>
                      </div> 
                      <div class ="col">
                          <label>Fecha disposición crédito</label>
                          <input class="form-control" value= {fecha_disposicion} disabled/>
                      </div> 
                      <div class ="col"> 
                          <label>Fecha ingreso Zorro</label>
                          <input type="date" class="form-control" value= {fecha_ingreso_zorro}/>
                          <div class="invalid-feedback">
                            La fecha es requerida
                          </div>
                      </div> 
                      
                    </div>
                  </div>
        
                  <hr class="my-4"/>
                  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="staticBackdropLabel">Actualización</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <div class="alert alert-success" role="alert">
                                <h4 class="alert-heading">La solicitud se ha actualizado con éxito</h4>
                                <p>Los atributos cambiados se verán reflejados en la base de datos</p>
                                <hr/>
                                <p class="mb-0">Gracias</p>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                            </div>
                          </div>
                        </div>
                    </div>

                  {(status == 'dirty') ? (
                    <div>
                      <button class="w-100 btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                      type="sumbit"
                      onClick={editData}
                      >Guardar</button>
                      </div>
                  ) : null }

                </form>
              </div>
            </div>
          </main>
        </div>
            <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
              <script src="form-validation.js"></script>
          </body>
    );
}
export default FormularioS;