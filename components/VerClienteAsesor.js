import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import reporte from '../assets/images/reporte.png';
import solicitud from '../assets/images/solicitud.png';
import checkGreen from '../assets/images/checkGreen.png';
import close from '../assets/images/close.png';
import googleDocs from '../assets/images/googleDocs.png';
import Loading from './Loading'

function VerClienteAsesor(props){

    const [status, setStatus] = useState('idle');
    const [user, setUser]= useState({});
    
    const [notfound, setNFound] = useState('idle');
    const [error, setError] = useState(null);

    //usuario = props.location.query.user;
    
    useEffect(()=>{
            axios.get(`http://localhost:5000/leaflets/${props.match.params.id}`)
            .then((result)=>{
                console.log('result', result)
                if(result.data.data){
                    setUser(result.data.data)
                    setStatus('resolved')
                    console.log('status', status)
    
            } 
                else
                setStatus('error')
                console.log('status', status)
            })
            .catch((error)=>{
                console.log('status', status)
                axios.get(`http://localhost:5000/borrowers/${props.match.params.id}`)
                .then((result)=>{
                    console.log('res from server: ', result)
                    setUser(result.data.data[0])
                    console.log('result.data.data[0]', result.data.data[0])
                    setStatus('borrower')
                })
                .catch((error)=>{
                    setError(error)
                })
            })
        
        
    }, [])

    console.log('props',props)
    console.log('user',user)
    console.log('status',status)

    function checkNull(props)
    {
        if (props === null)
        return 'danger'
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
if(status != 'error' || status != 'idle'){
        return(
            <div class="card position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light shadow-sm">
                
                {(status == 'resolved') ? (
                    <div>
                        <div class="ol-md-9 mx-auto">
                            <div id="text2bt">
                                <h4 class="display-4 fw-normal" id="subtitulo">{user.nombre} {user.apellido_paterno} {user.apellido_materno}</h4>
                                <h3 class="text-muted fw-light"> ID: {user.clientID}</h3>
                                <p>Teléfono: {user.telefono}</p>
                                <p>Tienda: {user.storeID}</p>
                                <p id="colorrojo">Contactos: </p>
                                <p>{user.fecha_contacto1}</p>
                                <p>{user.fecha_contacto2}</p>
                                <p>{user.fecha_contacto3}</p>
                                <p id="colorrojo">Compromisos: </p>
                                <p>{user.compromiso1}</p>
                                <p>{user.compromiso2}</p>
                                <p>{user.compromiso3}</p>
                            </div>
                        </div>
                        <div class="d-grid gap-2 d-md-block">
                            <Link className="Menu_link" to={{pathname: `/Prospecto/a-Prestatario`, query: {'user': user}}}>
                                    <button type="submit" class="btn btn-lg btn-outline-light" id = "btp" >Completar datos</button>
                            </Link>
                            <Link className="Menu_link" to={{pathname: `/EditarProspecto/${user.clientID}`, query: {'user': user}}}>
                                    <button type="submit" class="btn btn-lg btn-outline-danger" id = "textbt" >Editar</button>
                            </Link>
                        </div>


                    </div>
                ) :
                <div>
                <div class="ol-md-9 mx-auto">
                    <h4 class="display-4 fw-normal" id="subtitulo">{user.nombre} {user.apellido_paterno} {user.apellido_materno}</h4>
                    <h6 class="lead fw-normal"> <small class="text-muted">ID: {user.clientID}</small> </h6>
                    <p class="lead fw-normal">Teléfono: {user.telefono}</p>
                    <p class="lead fw-normal">Tienda: {user.storeID}</p>
                    <p class="lead fw-normal" id="colorrojo">Contactos: </p>
                    <p class="lead fw-normal">{user.fecha_contacto1}</p>
                    <p class="lead fw-normal">{user.fecha_contacto2}</p>
                    <p class="lead fw-normal">{user.fecha_contacto3}</p>
                    <p class="lead fw-normal" id="colorrojo">Compromisos: </p>
                    <p class="lead fw-normal">{user.compromiso1}</p>
                    <p class="lead fw-normal">{user.compromiso2}</p>
                    <p class="lead fw-normal">{user.compromiso3}</p>
                </div>
                <div class="d-grid gap-2 d-md-block">
                    <Link className="Menu_link" to={`/Solicitud/${user.clientID}`}>
                        <button type="button" class="btn btn-lg btn-outline-light" id = "btp" >Ver solicitud</button>
                    </Link>
                    <Link className="Menu_link" to={{pathname: `/EditarProspecto/${user.clientID}`, query: {'user': user}}}>
                        <button type="button" class="btn btn-lg btn-outline-danger" id = "textbt" >Editar</button>
                    </Link>
                </div>
            </div> 
            }

                
                                
            </div> 
        );
    
        }
}

export default VerClienteAsesor;