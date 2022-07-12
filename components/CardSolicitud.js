import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import reporte from '../assets/images/reporte.png';
import solicitud from '../assets/images/solicitud.png';
import aceptado from '../assets/images/checkGreen.png';
import rechazado from '../assets/images/close.png';
import revision from '../assets/images/googleDocs.png';
import Loading from './Loading'


let estado;
function CardSolicitud(props){
    
    const [status, setStatus] = useState('idle');
    const [users, setUsers]= useState([]);
    const [error, setError] = useState(null);


    useEffect(()=>{
        setStatus('loading')
        setError(null)
        
        axios.get('http://localhost:5000/client-applications')
        .then((result)=>{
            setUsers(result.data.data[0])
            setStatus('resolved')
        })
        .catch((error)=>{
            setError(error)
            setStatus('error')
        })
    }, [])

    if( status === 'idle' || status === 'loading' ){
        return <Loading />
    }

    function check(props)
    {
        if (props === 'aceptado')
        estado = aceptado;
        else if (props === 'rechazado')
        estado = rechazado;
        else if (props === 'revision')
        estado = revision;
    }

    if ( status === 'resolved'){ 
        return(
        <div class="row row-cols-md-3  text-center">
            {users.map((user)=>(
                
                        <div class="card mb-4 rounded-3 shadow-sm">
                            <div class="card-header py-3">
                                <h4 class="my-0 fw-normal">Solicitud {user.credit_requestID}</h4>
                            </div>
                            <div class="card-body" {...check(user.estatus_de_solicitud)}>
                                <h1 class="card-title pricing-card-title"> ID: {user.borrowerID} <small class="text-muted fw-light">/{user.nombre} {user.apellido_paterno}</small></h1>
                                <ul class="list-unstyled mt-3 mb-4">
                                <li>
                                <span> Crédito solicitado: </span>    <span> ${user.credito_solicitud}</span>  
                                </li>
                                <li>Contacto: {user.telefono}</li>
                                <li>Estatus:</li>
                                <img class="img-responsive" src={estado} alt="estatus" width="60"/> {/* estatus imagen `${user.estatus_de_solicitud}` */}
                                </ul>
                                <Link className="Menu_link" to={`/Solicitud/${user.credit_requestID}`}>
                                <button type="button" class="w-60 btn btn-lg btn-outline-light" id = "btp" >Editar</button>
                                </Link>
                            </div>
                        </div>
            ))}
            <br/> 
        </div>
    );
    }
}
export default CardSolicitud;