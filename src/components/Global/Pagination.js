import React from 'react'


function Pagination({ itemsPerPage, totalitems, paginate ,prevEvent, nextEvent}) {
    const pageNumbers = []
    
    for (let i =1; i < Math.ceil(totalitems / itemsPerPage)+1; i++) {
        pageNumbers.push(i)
    }

    return (
        <nav aria-label="Page navigation example mt-1">
            <ul className='pagination' >
                <li class="page-item">
                    <a class="page-link"  onClick={(e)=> prevEvent(e)} href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>

                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => paginate(number)} href='#' className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
                <li class="page-item">
                    <a class="page-link" onClick={(e)=>nextEvent(e) } href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>

        </nav>
    )
}

export default Pagination