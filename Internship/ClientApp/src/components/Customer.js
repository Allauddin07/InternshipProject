import React, { useEffect, useRef, useState } from 'react';
import DeleteModel from './DeleteModel';
import { Button } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateModal from './CreateModal'
import UpdateModal from './UpdateModal';
import Pagination from './Pagination';
import { Select, Menu } from 'semantic-ui-react'




function exampleReducer(state, action) {
    switch (action.type) {
        case 'close':
            return { open: false }
        case 'open':
            return { open: true, size: action.size }
        default:
            throw new Error('Unsupported action...')
    }
}

function Customer() {

    //--------Created CustomerId Variable to store CustomerId-------
    const CustomerId = useRef();

    //--------Created Name Variable to store Customer Name-------
    const [name, setName] = useState({ name: null })

    //--------Created arr State to hold List of all Customer-------
    const [arr, setarr] = useState([])


    //----------Deletion message function if Customer is deleted-------
    const error = (mg) => toast.error(mg, {
        position: "top-center",
        autoClose: 2000
    });

    //--------Created st State to hold Deatil of single Customer-------
    const [st, setSt] = useState({
        id: null,
        name: null,
        address: null
    })


    //--------Created modelshow State to show UpdateModal-------
    const [modalShow, setModalShow] = useState(false);

    //--------Created modelshow State to show CreatedModal-------

    const [customer, setCustomer] = useState(false)

    // ----------This function will fetch all customer-------------
    async function fetchdata() {

        const data = await fetch("https://internshipproject.azurewebsites.net/api/customer/getall", {

            method: "get",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true,
                'Access-Control-Allow-Origin': '*',



            }
        })

        const res = await data.json()
        console.log(res.result.reverse())
        setarr(res.result)

    }

    // ----------This function will delete single customer-------------
    async function del_customer(id) {

        const data = await fetch(`https://internshipproject.azurewebsites.net/api/customer/delete/${id}`, {

            method: "delete",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true,
                'Access-Control-Allow-Origin': '*',



            }
        })
        const res = await data.json()

        fetchdata()
        error(res)

    }

    //------Showing Delete Modal and storing id in CustomerId----------
    const deleteCustomer = (id) => {

        dispatch({ type: 'open', size: 'small' })
        CustomerId.current = id


    }

    //-----------This function will fetch single customer deatil---------------
    async function singleCustomer(id) {
        console.log(id)

        const data = await fetch(`https://internshipproject.azurewebsites.net/api/customer/singlecustomer/${id}`, {

            method: "get",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true,
                'Access-Control-Allow-Origin': '*',



            }


        })
        console.log(data)
        const res = await data.json()
        console.log(res)

        setSt({
            id: res.customerId,
            name: res.name,
            address: res.address
        })





    }

    //-----------Called singleCustomer Func in this function-------------
    function getSingle(id, fun) {
        singleCustomer(id)

        fun()
    }



    //--------Created state for Delete Modal ------------------>
    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        size: undefined,
    })
    const { open, size } = state

    //---------Called fetch method in useEffect-----------
    useEffect(() => {
        fetchdata()


    }, [])

    const [currentPage, setCurrentPage] = useState(0);
    const [dropdown, setDropdown] = useState(10)
    const PER_PAGE = dropdown;
    const offset = currentPage * PER_PAGE;
    const currentPageData = arr
        .slice(offset, offset + PER_PAGE)
        ;
    const pageCount = Math.ceil(arr.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const options = [
        { key: 1, text: 'Show 5 items', value: 5 },
        { key: 2, text: 'Show 10 items ', value: 10 },
        { key: 3, text: 'Show 15 items ', value: 15 },
    ]







    return (
        <>
            <ToastContainer position="top-center"
                autoClose={2000} />


            <div className='ui container'>
                <Button positive onClick={() =>

                    setCustomer(true)}>
                    Create Customer
                </Button>
                <table className="ui celled table">
                    <thead className="">
                        <tr className="">
                            <th className="">Name</th>
                            <th className="">Address</th>
                            <th className="">Action</th>
                            <th className="">Action</th>
                        </tr>
                    </thead>
                    <tbody >

                        {
                            currentPageData.map((val) => {
                                return (

                                    <tr key={val.customerId} className="">
                                        <td className="">{val.name}</td>
                                        <td className="">{val.address}</td>
                                        <td className=""><Button style={{ backgroundColor: 'orange' }} onClick={() =>

                                            getSingle(val.customerId, () => setModalShow(true))}>
                                            <i className="fa-solid fa-pen-to-square" ></i>
                                            &nbsp; Edit</Button></td>


                                        <td className=""><Button style={{ backgroundColor: 'orangered' }}
                                            onClick={() => {
                                                deleteCustomer(val.customerId)
                                                setName({ name: val.name })
                                            }}>
                                            <i className="fa-solid fa-trash"></i>
                                            &nbsp; Delete
                                        </Button></td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>


                </table>


                <div className='showItem'>
                    <div className='dropdown'>
                        <Menu compact>
                            <Select onChange={(e, data) => {
                                setDropdown(data.value)
                            }} value={dropdown} options={options} item />
                        </Menu>
                    </div>


                    <Pagination

                        handlePageClick={handlePageClick}
                        pageCount={pageCount}
                    />
                </div>





            </ div>

            <DeleteModel
                name={name.name}
                header={'Delete Customer'}
                customerId={CustomerId.current}

                delete={() => del_customer(CustomerId.current)}
                open={open}
                size={size}
                onClose={() => dispatch({ type: 'close' })} />




            <CreateModal
                fieldName={"address"}
                entity={'customer'}
                name={'Customer'}
                open={customer}
                size={'small'}
                onShow={() =>
                    setCustomer(true)}
                fetch={() => fetchdata()}
                onClose={() =>

                    setCustomer(false)} />


            <UpdateModal
                fieldName={"address"}
                entity={'customer'}
                name={'Customer'}
                obj={st}
                fetch={() => fetchdata()}
                size={'small'}
                open={modalShow}
                onClose={() =>
                    setModalShow(false)}
            />

        </>

    );

}

export default Customer



