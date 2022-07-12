import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import aceptado from '../assets/images/checkGreen.png';
import rechazado from '../assets/images/close.png';
import revision from '../assets/images/googleDocs.png';
import Loading from './Loading'

let estado;

function VerSolicitudAsesor(props){ 
    const [status, setStatus] = useState('idle');
    const [user, setUser]= useState({});
    const [error, setError] = useState(null);

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

    if(status === 'idle' || status === 'loading' ){
        return <Loading />
    }

    function checkStatus(props)
    {
        if (props === 'aceptado')
        estado = aceptado;
        else if (props === 'rechazado')
        estado = rechazado;
        else if (props === 'revision')
        estado = revision;
    }

    function checkNull(props)
    {
        if (props === null)
        return 'primary'
    }

    if(status === 'error') {
        return(
            <div class="alert alert-danger text-center" role="alert">
                Ups, al parecer no existe la solicitud que buscabas
            </div>
            );
    }

    if ( status === 'resolved'){
        return(
            <div class="card position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light shadow-sm"
            {...checkStatus(user.estatus_de_solicitud)}>
                <div class="col-md-9 mx-auto">
                    <div id="text2bt">
                        <h4 class="display-4 fw-normal" id="subtitulo">{user.nombre} {user.apellido_paterno} {user.apellido_materno}</h4>
                        
                        <h3 class="text-muted fw-light"> ID cliente: {user.borrowerID}</h3>
                        <h3 class="text-muted fw-light"> Solicitud: {user.credit_requestID}</h3>
                        
                        <p class={`alert alert-${checkNull(user.credito_solicitud)}`}>Crédito solicitado: ${user.credito_solicitud}</p>
                        <p class={`alert alert-${checkNull(user.tipo_de_credito_solicitado)}`}>Tipo de crédito solicitado: {user.tipo_de_credito_solicitado}</p>
                        <p class={`alert alert-${checkNull(user.clientID)}`}>No. cliente Zorro: {user.clientID}</p>
                        <p class={`alert alert-${checkNull(user.fecha_ingreso_zorro)}`}>Antiguedad: {user.fecha_ingreso_zorro}</p> {/* calcular antiguedad */}
                        <p class={`alert alert-${checkNull(user.fecha_alta_ISI)}`}>Fecha de alta en ISI: {user.fecha_alta_ISI}</p>
                        <p class={`alert alert-${checkNull(user.capacidad_de_pago)}`}>Capacidad de pago: ${user.capacidad_de_pago}</p>
                        <p class={`alert alert-${checkNull(user.fecha_solicitud)}`}>Fecha de solicitud: {user.fecha_solicitud}</p>
                        <p class={`alert alert-${checkNull(user.credito_autorizado)}`}>Crédito autorizado: {user.credito_autorizado}</p>
                        <p class={`alert alert-${checkNull(user.tipo_credito_autorizado)}`}>Tipo de crédito autorizado: {user.tipo_credito_autorizado}</p>
                        <p class={`alert alert-${checkNull(user.credito_dispuesto)}`}>Crédito dispuesto: {user.credito_dispuesto}</p>
                        <p class={`alert alert-${checkNull(user.fecha_autorizacion)}`}>Fecha de autorizacion: {user.fecha_autorizacion}</p>
                        <p class={`alert alert-${checkNull(user.fecha_disposicion)}`}>Fecha de disposicion: {user.fecha_disposicion}</p>
                        <p class={`alert alert-${checkNull(user.analystID)}`}>Analista asignado: {user.analystID}</p>
                        <p class={`alert alert-${checkNull(user.estatus_de_solicitud)}`}>Estatus: {user.estatus_de_solicitud}</p>
                        <img class="bi me-2" src={estado} alt="estatus" width="60"/> {/* estatus imagen */}
                    </div>
                </div>
                
                <Link className="Menu_link" to={{pathname: `/EditarSolicitud/${user.credit_requestID}`, query: {'user': user}}}>
                    <br/>
                    <button type="button" class="w-50 btn btn-lg btn-outline-light" id="btp">Editar</button>
                </Link>
                        
                   
            </div> 
        );
    }
}

export default VerSolicitudAsesor;