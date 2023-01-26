import React from 'react'
import "./xodimlar.css"

export default function Pagination({ postsPerPage, totalPosts, paginate }) {

  const pageNumber = [];

  for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul className='pagination'>
        {pageNumber.map(number => (
          <li onClick={() => paginate(number)} key={number} className='page-item text-center mx-2 p-1'>
            {number}
          </li>
        ))}
      </ul>
    </nav>
  )
}
