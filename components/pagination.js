import React from 'react'

function Pagination(props){

    {/*const {
        currentPage,
        totalNumResults,
        numResults,
        pages,
    } = props.pagination*/}


    return (
        <nav aria-label="Page navigation example" class="position-relative"> {/*Componente de paginacion*/}
            <ul class="pagination position-absolute top-100 start-50 translate-middle">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                
                <li class="page-item">
                    <a class="page-link" href="#">1
                    </a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}
export default Pagination;