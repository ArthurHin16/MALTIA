import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading'

let usuario = [];
function FormPrestatario(props){

    usuario = props.location.query.user;
    console.log('props.usuario', usuario)

    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const [user, setUser] = useState({

        compromiso1: '', 
        compromiso2: '', 
        compromiso3: '',
        fecha_contacto1: '',
        fecha_contacto2: '', 
        fecha_contacto3: '',
        referencia1: '',
        referencia2: '',
        telefono_ref1: '',
        telefono_ref2: '',
        fecha_nacimiento: '',
        no_zorro: '',
        INE: '',
        direccion: '',
        firma_buro_credito: '',

    });

    useEffect(()=>{
        console.log('props on edit: ', props);
        axios.get(`http://localhost:5000/borrowers/${props.match.params.id}`)
            .then((result) => {
                setUser(result.data.data[0][0])
                setStatus('resolved')
                console.log(result.data.data)

            })
            .catch((error) => {
                console.log(error)
                setError(error)
                setStatus('error')
            })
    },[])

    const editData = (props) => {
        console.log('user', user)
        axios.patch(`http://localhost:5000/borrowers/${usuario.clientID}`, user)
          .then(response => {
            setStatus('resolved')
          })
          .catch(error => {
            setStatus('error')
          })
        }

        const handleChange = (event)=> {

            const {name, value} = event.target;
            console.log('event.target', event.target)
            
            setUser({
                    ...user,
                    [name]: value
            })
        }
        return(
            <div>
                
                <h3 id="textbt">Prestatario</h3>
                <br/>
                    <form novalidate>
                    <div class="row g-6 mb-3">
    
                        <div class="row g-6 mb-3">
                            <div class="col-sm-6">
                                <label>Fecha de nacimiento</label>
                                <input type="date" class="form-control" defaultValue={user.fecha_nacimiento} name="fecha_nacimiento" onChange={e => handleChange(e)}/>
                            </div>
                            <div class="col-sm mb-3">
                                    <label>Dirección</label>
                                    <input type="text" class="form-control" defaultValue={user.direccion} name="direccion" onChange={e => handleChange(e)}/>
                            </div>  
                        </div>
    
                        <div class="row g-6 mb-3">
                            <div class="col-sm-6">
                                <label>No. cliente Zorro</label>
                                <input type="text" class="form-control" defaultValue={user.no_zorro} name="no_zorro" onChange={e => handleChange(e)}/>
                            </div>
                            <div class="col-sm mb-3">
                                    <label>INE</label>
                                    <input type="text" class="form-control" defaultValue={user.INE} name="ine" onChange={e => handleChange(e)}/>
                            </div>  
                        </div>
    
                        <div class="row g-6 mb-3">
                            <div class="col-sm-6">
                                <label>Referencia 1</label>
                                <input type="text" class="form-control" defaultValue={user.referencia1} name="referencia1" onChange={e => handleChange(e)}/>
                            </div>
                            <div class="col-sm mb-3">
                                    <label>Teléfono</label>
                                    <input type="text" class="form-control" defaultValue={user.telefono_ref1} name="telefono_ref1" onChange={e => handleChange(e)}/>
                            </div>  
                        </div>
    
                        <div class="row g-6 mb-3">
                            <div class="col-sm-6">
                                <label>Referencia 2</label>
                                <input type="text" class="form-control" defaultValue={user.referencia2} name="referencia2" onChange={e => handleChange(e)}/>
                            </div>
                            <div class="col-sm mb-3">
                                    <label>Teléfono</label>
                                    <input type="text" class="form-control" defaultValue={user.telefono_ref2} name="telefono_ref2" onChange={e => handleChange(e)}/>
                            </div>  
                        </div>
    
                        <div class="mb-3">
                           
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" defaultValue={user.firma_buro_credito} name="firma_buro_credito" onChange={e => handleChange(e)} checked={user.firma_buro_credito} required/>
                            <label for="form-check-label" for="flexSwitchCheckDefault">Firma de buró de crédito</label>
                            
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
                                    <h4 class="alert-heading">Se ha editado el prestatario con éxito</h4>
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


                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                        <Link className="Menu_link" to={{pathname: `/Prospecto/a-Prestatario/Solicitud`, query: {'user': user}}}>
                            <button type="submit" class="btn btn-lg btn-outline-light" id="btp">Iniciar Solicitud</button>
                        </Link>
                        
                            <button type="button" class="btn btn-lg btn-outline-danger" id="textbt" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={editData}>Guardar</button>
                        
                    </div>
                
                </form>
            </div>
            
        );
      
    

        
   
}

export default FormPrestatario;