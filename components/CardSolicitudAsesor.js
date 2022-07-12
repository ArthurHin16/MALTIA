import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import aceptado from '../assets/images/checkGreen.png';
import rechazado from '../assets/images/close.png';
import revision from '../assets/images/googleDocs.png';
import Loading from './Loading'

let estado;
let estatus='';
function CardSolicitudAsesor(props){
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
        if (props === 'aceptado') {
            estado = aceptado;
            estatus = 'aceptado';
        }
        else if (props === 'rechazado') {
            estado = rechazado;
            estatus = 'rechazado';
        }
        else if (props === 'revision') {
            estado = revision;
            estatus = 'revision';
        }
    }
    console.log('estatus', estatus)
    if (status === 'resolved'){
        return(
            <div>
                <h3 id="textbt">Solicitudes</h3>
                <br/>
                <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
                    {users.length > 0 && users.map((user)=>{
                        return(
                            <div class="col">                                    
                                    <div class="card mb-4 rounded-3 shadow-sm bg-light">
                                    <Link id="subrayado" to={`/Solicitudes/${user.credit_requestID}`}>

                                        <div class="card-header py-3">
                                            <h5 class="my-0 fw-normal">Solicitud {user.credit_requestID}</h5>
                                        </div>
                                    </Link>
                                        
                                        <div class="card-body" {...check(user.estatus_de_solicitud)}>
                                        <Link id="subrayado" to={`/Solicitudes/${user.credit_requestID}`}>

                                            <ul class="list-unstyled mt-3 mb-4">
                                                <h4 id="subtitulo">{user.nombre} {user.apellido_paterno} {user.apellido_materno}</h4>
                                                <li>ID cliente: {user.borrowerID}</li>
                                                <li>Estatus: {user.estatus_de_solicitud}</li>
                                                <img class="bi me-2" src={estado} alt="estatus" width="50"/> {/* ICON */}
                                            </ul>
                                        </Link>
                                            <div class="d-grid gap-2">


                                            {(estatus == 'aceptado') ? (
                                                <div>
                                                <button class="btn btn-lg btn-outline-light disabled" id = "btp"
                                                type="button"
                                                >Editar</button>
                                                </div>
                                            ) : 
                                            <div>
                                                <Link className="Menu_link" to={{pathname: `/EditarSolicitud/${user.credit_requestID}`, query: {'user': user}}}>

                                                    <button class="btn btn-lg btn-outline-light" id = "btp"
                                                    type="button"
                                                    >Editar</button>
                                                </Link>
                                                </div>
                                            }

                                               {/* <Link className="Menu_link" to={{pathname: `/EditarSolicitud/${user.credit_requestID}`, query: {'user': user}}}>
                                                    <button type="button" class="btn btn-lg btn-outline-light disabled" id = "btp" >Editar</button>
                                                </Link> disabled="disabled" */}
                                            </div>
                                        
                                        </div>
                                        
                                    </div>
                                
                                
                            </div>
                        )
                    })}
                    <br/> 
                </div>
            </div> 
        );
    }
    
}

export default CardSolicitudAsesor;