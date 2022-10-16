import React,{useState} from 'react'
import ReactPaginate from 'react-paginate';
import {BsArrowBarRight} from 'react-icons/bs';
import {BsArrowBarLeft} from 'react-icons/bs';


const Pagination = (props) => {


  return (
<div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
      }}
    >
      <ReactPaginate
        activeClassName={'item1 active1 '}
        breakClassName={'item1 break-me '}
        breakLabel={'...'}
        containerClassName={'pagination'}
        disabledClassName={'disabled-page'}
        marginPagesDisplayed={2}
        nextClassName={"item1 next "}
        nextLabel={<BsArrowBarRight style={{ fontSize: 18 }}/>}
        onPageChange={props.handlePageClick}
        pageCount={props.pageCount}
        pageClassName={'item1 pagination-page '}
        pageRangeDisplayed={2}
        previousClassName={"item1 previous"}
        previousLabel={<BsArrowBarLeft style={{ fontSize: 18 }}/>}
      />




    </div>
  )
}

export default Pagination