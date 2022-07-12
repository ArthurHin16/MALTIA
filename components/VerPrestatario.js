import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import reporte from '../assets/images/reporte.png';
import solicitud from '../assets/images/solicitud.png';
import checkGreen from '../assets/images/checkGreen.png';
import close from '../assets/images/close.png';
import googleDocs from '../assets/images/googleDocs.png';
import Loading from './Loading'

function VerPrestatario(props){
    const [status, setStatus] = useState('idle');
    const [user, setUser]= useState({});

    
    useEffect(()=>{
        axios.get(`http://localhost:5000/borrowers/${props.match.params.id}`)
        .then((result)=>{
            if(result.data.data[0][0]){
            setUser(result.data.data[0][0])
            console.log('result.data.data[0]', result.data.data[0])

            setStatus('resolved')} 
            else
            setStatus('error')
        })
        .catch((error)=>{
            setStatus('error')
        })
    }, [])

    function checkNull(props)
    {
        if (props === '' || props === '          '  || props === 'false' || props === null)
        return 'danger'

    }

    console.log('nombre', user.nombre)
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

    if ( status === 'resolved'){
        return(
            <div class="card position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light shadow-sm">
            <div class="ol-md-9 mx-auto">
                <div id="text2bt">
                        <h4 class="display-4 fw-normal" id="subtitulo">{user.nombre} {user.apellido_paterno} {user.apellido_materno}</h4>
                        <h3 class="text-muted fw-light">ID: {user.clientID}</h3>
                        <p class="lead fw-normal">Teléfono: {user.telefono}</p>
                        <p class="lead fw-normal">Tienda: {user.storeID}</p>
                        <h3 id="colorrojo">Contactos: </h3>
                        <p class={`alert alert-${checkNull(user.fecha_contacto1)}`}>{user.fecha_contacto1}</p>
                        <p class={`alert alert-${checkNull(user.fecha_contacto2)}`}>{user.fecha_contacto2}</p>
                        <p class={`alert alert-${checkNull(user.fecha_contacto3)}`}>{user.fecha_contacto3}</p>
                        <h3 id="colorrojo">Compromisos: </h3>
                        <p class={`alert alert-${checkNull(user.compromiso1)}`}>{user.compromiso1}</p>
                        <p class={`alert alert-${checkNull(user.compromiso2)}`}>{user.compromiso2}</p>
                        <p class={`alert alert-${checkNull(user.compromiso3)}`}>{user.compromiso3}</p>

                        <p class={`alert alert-${checkNull(user.firma_buro_credito)}`}>Firma de buró de crédito: {user.firma_buro_credito} </p>
                        <p class={`alert alert-${checkNull(user.INE)}`}>INE: {user.INE} </p>
                        <p class={`alert alert-${checkNull(user.no_zorro)}`}>No. de cliente Zorro: {user.no_zorro} </p>
                        <p class={`alert alert-${checkNull(user.direccion)}`}>Dirección: {user.direccion} </p>
                        <p class={`alert alert-${checkNull(user.referencia1)}`}>Refencia 1: {user.referencia1} </p>
                        <p class={`alert alert-${checkNull(user.telefono_ref1)}`}>Teléfono: {user.telefono_ref1} </p>
                        <p class={`alert alert-${checkNull(user.referencia2)}`}>Refencia 2: {user.referencia2} </p>
                        <p class={`alert alert-${checkNull(user.telefono_ref2)}`}>Teléfono: {user.telefono_ref2} </p>
                </div>
            </div>


                <div class="d-grid gap-2 d-md-block">
                    <Link className="Menu_link" to={{pathname: `/Prospecto/a-Prestatario/Solicitud`, query: {'user': user}}}>
                        <button type="button" class="btn btn-lg btn-outline-light" id = "btp" >Iniciar solicitud</button>
                    </Link>
                    <Link className="Menu_link" to={{pathname: `/EditarPrestatario/${user.clientID}`, query: {'user': user}}}>
                        <button type="button" class="btn btn-lg btn-outline-danger" id = "textbt" >Editar</button>
                    </Link>
                </div>
                </div>

        );
    }
}

export default VerPrestatario;