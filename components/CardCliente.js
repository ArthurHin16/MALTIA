import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading'

function CardCliente(props){
    const [status, setStatus] = useState('idle');
    const [notfound, setNFound] = useState('idle');
    const [borrowers, setBorrowers]= useState([]);
    const [leaflets, setLeaflets]= useState([]);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});
    
    useEffect(()=>{
        setStatus('loading')
        setError(null)

        fetchUsers({
            page: 1,
        });


        axios.get('http://localhost:5000/leaflets')
        .then((result)=>{
            if(result.data.data){
                setLeaflets(result.data.data)
            }
            else
                setNFound('notfound')
        })
        .catch((error)=>{
            setNFound('notfound')
        })
        
        

    }, [])

    
    

    function fetchUsers(params) {
        setStatus('loading')
        
        const queryParams = {
            page: pagination.currentPage,
            ...params
        }

        let queryString = Object.keys(queryParams).map((key) => {return encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key])}).join('&');
        console.log('queryString ', queryString);
        axios({
            method: 'get',
            url: `http://localhost:5000/leaflets?${queryString}`,
        })
            .then((result) => {
                setLeaflets(result.data.data)
                setPagination({ // PAGINATION
                    currentPage: result.data.currentPage,
                    totalNumResults: result.data.totalNumResults,
                    numResults: result.data.numResults,
                    pages: result.data.pages,
                })
                setStatus('resolvedLeaflet')
            })
            .catch((error)=>{
                setStatus('error')
            })
    }
    // PAGINATION
    function handleBack(){
        fetchUsers({
            page:pagination.currentPage - 1,
        });
    }
    function handleNext(){
        fetchUsers({
            page:pagination.currentPage + 1,
        });
    }
    
    if( status === 'idle' || status === 'loading' ){
        return <Loading />
    }
    if(status === 'error' && notfound === 'error') {
        return(
            <div class="alert alert-danger text-center" role="alert">
                Ups, al parecer no existe la solicitud que buscabas
            </div>
        );
    }
    console.log('props', props)
    console.log('props.match.params', props.match.params)



        return(
            <div>

                
                        <h3 id="textbt">Prospectos</h3>
                        <br/>


                        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
                            {leaflets.length > 0 && leaflets.map((leaflet)=>{
                                return(
                                        <div class="col">
                                            
                                            
                                            
                                            <div class="card mb-4 rounded-3 shadow-sm bg-light">
                                                <Link id="subrayado" to={`/Prospectos/${leaflet.clientID}`}>
                                                    <div class="card-header py-3">
                                                        <h5 class="my-0 fw-normal">ID: {leaflet.clientID}</h5>
                                                    </div>
                                                </Link>
                                                    <div class="card-body">
                                                    
                                                        <ul class="list-unstyled mt-3 mb-4">
                                                        <Link id="subrayado" to={`/Prospectos/${leaflet.clientID}`}>
                                                            <h4 id="subtitulo">{leaflet.nombre} {leaflet.apellido_paterno} {leaflet.apellido_materno}</h4>
                                                            
                                                            <li>Teléfono: {leaflet.telefono}</li>
                                                            <li>Tienda: {leaflet.storeID} </li>
            
                                                            <div class="btn-group dropend d-grid gap-2 col-6 mx-auto">
                                                            <li class="dropdown-toggle" data-bs-toggle="dropdown">Contactos: </li>
                                                                <ul class="dropdown-menu">
                                                                    <li>{leaflet.fecha_contacto1}</li>
                                                                    <li>{leaflet.fecha_contacto2}</li>
                                                                    <li>{leaflet.fecha_contacto3}</li>
                                                                </ul>
                                                                <li class="dropdown-toggle" id="salto" data-bs-toggle="dropdown">Compromisos: </li>
                                                                <ul class="dropdown-menu">
                                                                    <li>{leaflet.compromiso1}</li>
                                                                    <li>{leaflet.compromiso2}</li>
                                                                    <li>{leaflet.compromiso3}</li>
                                                                </ul>
                                                            </div>
                                                        </Link>
                                                        </ul>
                                                
                                                        
                                                            <div class="d-grid gap-2 d-md-block">
                                                                <Link className="Menu_link" to={{pathname: `/Prospecto/a-Prestatario`, query: {'user': leaflet}}}>
                                                                    <button type="submit" class="btn btn-lg btn-outline-light" id = "btp" >Completar datos</button>
                                                                </Link>
                                                                <Link className="Menu_link" to={{pathname: `/EditarProspecto/${leaflet.clientID}`, query: {'user': leaflet}}}> 
                                                                    <button type="submit" class="btn btn-lg btn-outline-danger" id = "textbt" >Editar</button>
                                                                </Link>
                                                            </div>
                                                            
                                                    </div>
                                                
                                            </div>
                                                
                                                
                                            
                                        </div>
                                )
                            })}
                        </div>



                   

                    <div aria-label="..." class="position-relative">
                                    <ul class="pagination position-absolute top-100 start-50 translate-middle">
        
                                        <li class="page-item">
                                            <button class="page-link"
                                                type="button"
                                                onClick={handleBack}
                                                disabled={pagination.currentPage === 1}
                                            >
                                                <span aria-hidden="true">&laquo;</span>
                                                <span class="sr-only"> Atras </span>
                                            </button>
                                        </li>
        
                                        <li class="page-item">
                                            <button class="page-link"
                                                type="button"
                                            > {pagination.currentPage}
                                            </button>
                                        </li>
        
                                        <li class="page-item">
                                            <button class="page-link"
                                                type="button"
                                                onClick={handleNext}
                                                disabled={pagination.currentPage === pagination.page}
                                            >
                                                <span class="sr-only"> Siguiente </span> 
                                                <span aria-hidden="true">&raquo;</span>
                                            </button>
                                        </li>         
                                    </ul>
                                </div>
                       
            </div>
            
        );
    
}

export default CardCliente;