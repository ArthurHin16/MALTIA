import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading'

function CardPrestatario(props){
    const [status, setStatus] = useState('idle');
    const [users, setUsers]= useState([]);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});
    const [leaflets, setLeaflets]= useState([]);

    useEffect(()=>{
    

        setStatus('loading')
        setError(null)

        axios.get('http://localhost:5000/borrowers')
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

    if (status === 'resolved'){
        return(
            <div>
                <h3 id="textbt">Prestatarios</h3>
                <br/>
                <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
                    {users.length > 0 && users.map((user)=>{
                        return(
                                <div class="col">
                                    
                                    <Link id="subrayado" to={`/Prestatarios/${user.clientID}`}>
                                    
                                        <div class="card mb-4 rounded-3 shadow-sm bg-light">
                                            <div class="card-header py-3">
                                                <h5 class="my-0 fw-normal">ID: {user.clientID}</h5>
                                            </div>
                                            <div class="card-body">
                                                <ul class="list-unstyled mt-3 mb-4">
                                                    <h4 id="subtitulo">{user.nombre} {user.apellido_paterno} {user.apellido_materno}</h4>
                                                    <li>Teléfono: {user.telefono}</li>
                                                    <li>No. cliente Zorro: {user.no_zorro} </li>
    
                                                    <div class="btn-group dropend d-grid gap-2 col-6 mx-auto">
                                                        <li class="dropdown-toggle" data-bs-toggle="dropdown">Contactos: </li>
                                                        <ul class="dropdown-menu">
                                                            <li>{user.fecha_contacto1}</li>
                                                            <li>{user.fecha_contacto2}</li>
                                                            <li>{user.fecha_contacto3}</li>
                                                        </ul>
                                                        <li class="dropdown-toggle" id="salto" data-bs-toggle="dropdown">Compromisos: </li>
                                                        <ul class="dropdown-menu">
                                                            <li>{user.compromiso1}</li>
                                                            <li>{user.compromiso2}</li>
                                                            <li>{user.compromiso3}</li>
                                                        </ul>
                                                    </div>
                                                    
                                                </ul>
                                                    <div class="d-grid gap-2 d-md-block">
                                                        <Link className="Menu_link" to={{pathname: `/Prospecto/a-Prestatario/Solicitud`, query: {'user': user}}}>
                                                            <button type="button" class="btn btn-lg btn-outline-light" id = "btp" >Iniciar solicitud</button>
                                                        </Link>
                                                        <Link className="Menu_link" to={{pathname: `/EditarPrestatario/${user.clientID}`, query: {'user': user}}}>
                                                            <button type="button" class="btn btn-lg btn-outline-danger" id = "textbt" >Editar</button>
                                                        </Link>
                                                    </div>
                                                    
                                            
                                            </div>
                                        </div>
                                        
                                    </Link>
    
                                </div>
                        )
                    })}
                    <br/> 
                </div>
                </div>
    
                
        );
    }
    
}

export default CardPrestatario;