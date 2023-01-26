import React, {useEffect, useState} from "react";
import { useQueryParams } from "react-router-query-hooks";
import {HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight} from 'react-icons/hi';
import './Pagination.css';

function Pagination(props) {
   const { totalPages} = props;
   const [pages, setPages] = useState([]);
   const [query, { replaceQuery }] = useQueryParams();

   const { page } = query;

   const handlePage = (currentPage) => {
      if (totalPages > 8) {
         if (currentPage === totalPages || currentPage === totalPages - 1 || currentPage === totalPages - 2) {
            setPages([1, '', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]);
         } else if (currentPage === totalPages - 3) {
            setPages([1, '', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]);
         } else if (currentPage === totalPages - 4) {
            setPages([1, '', totalPages - 5, totalPages - 4, totalPages - 3, '', totalPages]);
         } else if (currentPage > 3) {
            setPages([1, '', currentPage - 1, currentPage, currentPage + 1, '', totalPages]);
         } else if (currentPage === '+1' && page <= totalPages) {
            currentPage = page + 1;
            handlePage(currentPage);
         } else if (currentPage === '-1' && page >= 1) {
            currentPage = page - 1;
            handlePage(currentPage);
         } else {
            setPages([1, 2, 3, 4, 5, '', totalPages]);
         }
      } else {
         if (currentPage === '+1' && page <= totalPages) {
            currentPage = page + 1;
            handlePage(currentPage);
         } else if (currentPage === '-1' && page >= 1) {
            currentPage = page - 1;
            handlePage(currentPage);
         }
      }

      replaceQuery({ ...query, page: currentPage });
   }

   useEffect(() => {
      const numbers = [];

      for (let i = 1; i <= totalPages; i++) {
         if (totalPages <= 8) {
            numbers.push(i);
         } else {
            if (i <= 5) {
               numbers.push(i);
            } else if (i === 6) {
               numbers.push('');
            } else if (i === totalPages) {
               numbers.push(i);
            }
         }
      }

      setPages(numbers);
   }, [totalPages]);

   return (
      <div className="pagination">
         <ul className="pagination__list">
            <li className="pagination__item">
               <button onClick={() => handlePage('-1')} className="pagination__button" disabled={page === 1}>
                  <HiOutlineChevronDoubleLeft className="pagination__icon"/>
               </button>
            </li>

            {pages.map((item, index) => (
               <li className="pagination__item" key={index}>
                  {item ?
                     <button onClick={() => handlePage(item)} className={`pagination__button ${page === item ? 'active' : ''}`}>
                        {item}
                     </button>
                     :
                     <button className="pagination__button" key={index}>....</button>
                  }
               </li>
            ))}

            <li className="pagination__item">
               <button onClick={() => handlePage('+1')} className="pagination__button" disabled={page === totalPages}>
                  <HiOutlineChevronDoubleRight className="pagination__icon"/>
               </button>
            </li>
         </ul>
      </div>
   )
}

export default Pagination;