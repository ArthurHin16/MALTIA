import React from 'react';
import maltia from '../assets/images/maltia.png';
import { useAuth } from '../auth-context';

function Header(){
    const { logout } = useAuth();

    return(
        <header class="navbar navbar-light sticky-top  flex-md-nowrap p-0 shadow" id ="btp">
            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3"> {/* color */}
                <img class="img-responsive" src={maltia} alt="Logo" width="150"/> {/* IMAGEN LOGO */}
            </a>

            <button class="navbar-toggler position-right d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-danger" type="submit">Buscar</button> {/* BOTON BUSCAR*/}
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <button class="nav-link" onClick={logout} href="/">Sign out</button>
                </li>
            </ul>
        </header>
        
    );
}
export default Header;