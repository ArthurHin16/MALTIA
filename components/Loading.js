import React from 'react'

function loading(props){
    return(
    <div class="container-fluid">
        <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    );
}

export default loading;
