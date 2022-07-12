import React from 'react'
import { Link } from 'react-router-dom';
import reporte from '../assets/images/reporte.png';
import solicitud from '../assets/images/solicitud.png';
import { useAuth } from '../auth-context';

let modifier='inactive';
let modifier2='inactive';
let temp=false;



function Menu(props){
    const { logout } = useAuth();

    if (props.location.pathname === "/SolicitudCard")
    {
        modifier='active';   modifier2='';    
    }
    else if(props.location.pathname === "/SolicitudReporte") {
        modifier2 ='active'; modifier ='';
    }
    else{
        modifier2 =''; modifier ='';
    }
    
    return (
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
                        <Link className="Menu_link" to="/SolicitudCard"   class= {`nav-link text-dark ${modifier}`}>
                        <img class=" bi me-2" src={solicitud} alt="Logo" width="26" height="26"/> {/* IMAGEN LOGO */}
                            Solicitudes 
                        </Link>
                        <Link className="Menu_link" to="/SolicitudReporte"   class= {`nav-link text-dark ${modifier2}`}>
                        <img class=" bi me-2" src={reporte} alt="Logo" width="26" height="26"/> {/* IMAGEN LOGO */}
                        Generar reporte 
                        </Link>
                    </li>
                    </ul>
                    <hr/>
                    <div class="dropdown">
                        <a href="#" class="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle me-2"/>
                            <strong>Analista</strong>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item" onClick={logout}>Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>  
    );
}

export default Menu;