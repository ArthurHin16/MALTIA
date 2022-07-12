import React from 'react';
import { Link } from 'react-router-dom';
import leaflet from '../assets/images/people.svg';
import borrower from '../assets/images/person-badge.svg';
import solicitud from '../assets/images/file-earmark-text.svg';
import addclientblack from '../assets/images/person-plus.svg';

let modifier='inactive';
let modifier2='inactive';
let modifier3='inactive';
let modifier4='inactive';
let temp=false;

function MenuAsesor(props) {

    if (props.location.pathname === "/Prospectos")
    {
        modifier='active';   modifier2='';   modifier3='';   modifier4 ='';
    }
    else if(props.location.pathname === "/Prestatarios") {
        modifier2 ='active'; modifier ='';   modifier3='';   modifier4 ='';
    }
    else if(props.location.pathname === "/Solicitudes") {
        modifier3 ='active'; modifier ='';   modifier2='';   modifier4 ='';
    }
    else if(props.location.pathname === "/AddProspecto") {
        modifier4 ='active'; modifier ='';   modifier2='';   modifier3 ='';
    }
    else{
        modifier2 =''; modifier =''; modifier3 =''; modifier4 ='';
    }

    return(
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" >
                <div class="position-sticky pt-3">
                    <div class="d-flex flex-column p-3  bg-light"> {/*bg-dark -> bg-light*/}
                        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                            <svg class="bi me-2" width="40" height="32"></svg>
                            <span class="fs-4" href="#">Menú</span>
                        </a>
                        <hr/>
                            <ul class="nav nav-pills flex-column mb-auto">
                                <li class="nav-item">
                                    <Link className="Menu_link" to="/Prospectos" class= {`nav-link text-dark ${modifier}`}>
                                        <img class="bi me-2" src={leaflet} alt="leaflet" width="17" height="17"/> {/* ICON */}
                                        Prospectos
                                    </Link>
                                    <Link className="Menu_link" to="/Prestatarios" class= {`nav-link text-dark ${modifier2}`}>
                                        <img class="bi me-2" src={borrower} alt="borrower" width="17" height="17"/> {/* ICON */}
                                        Prestatarios
                                    </Link>
                                    <Link className="Menu_link" to="/Solicitudes" class= {`nav-link text-dark ${modifier3}`}>
                                        <img class="bi me-2" src={solicitud} alt="solicitud" width="17" height="17"/> {/* ICON */}
                                        Solicitudes
                                    </Link>
                                    <Link className="Menu_link" to="/AddProspecto" class= {`nav-link text-dark ${modifier4}`}>
                                        <img class="bi me-2" src={addclientblack} alt="addclient1" width="17" height="17"/> {/* ICON */}
                                        Añadir prospecto
                                    </Link>
                                </li>
                            </ul>
                        <hr/>
                        
                        <div class="dropdown">
                            <a href="#" class="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle me-2"/>
                                    <strong>ASESOR</strong>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                <li><a class="dropdown-item" href="#">New project...</a></li>
                                <li><a class="dropdown-item" href="#">Settings</a></li>
                                <li><a class="dropdown-item" href="#">Profile</a></li>
                                <li><a class="dropdown-item" href="#">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
    );
}
export default MenuAsesor;