import React, { useEffect, useRef, useState } from 'react';

import DeleteModel from './DeleteModel';
import { Button, Modal, Form } from 'semantic-ui-react'
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
function Store() {

    // will store single Store Id
    const StoreId = useRef();

    //Declare name variable to hold store Name
    const [name, setName] = useState({ name: null })

    //Declare store variable to hold all store
    const [store, setStore] = useState([])

     //Declare update variable to hold updated value of single store
    const [update, setUpdate] = useState({
        id: null,
        name: null,
        address: null
    })

    // //Declare modalShow variable to show createModalShow
    const [modalShow, setModalShow] = useState(false);

     // //Declare modalShow variable to show updateModalshow
    const [modal, setModal] = useState(false)


// this function will show Deleted Message if store is Deleted
    const error = (mg) => toast.error(mg, {
        position: "top-center",
        autoClose: 2000
    });



  

    //----=this function will fetch all store from server-----------
    async function fetchdata() {

        const data = await fetch('https://internshipproject.azurewebsites.net/api/store/getall', {

            method: "get",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true,
                'Access-Control-Allow-Origin': '*',



            }
        })

        const res = await data.json()
        setStore(res.result.reverse())

    }



    async function del_Store(id) {



        const data = await fetch(`https://internshipproject.azurewebsites.net/api/store/delete/${id}`, {

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
    async function singleStore(id) {
        console.log(id)

        const data = await fetch(`https://internshipproject.azurewebsites.net/api/store/singlestore/${id}`, {

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

        setUpdate({
            id: res.storeId,
            name: res.name,
            address: res.address
        })





    }


    function getSingle(id, fun) {
        singleStore(id)

        fun()
    }


    const deleteStore = (id) => {

        dispatch({ type: 'open', size: 'small' })
        StoreId.current = id


    }


    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        size: undefined,
    })
    const { open, size } = state

// ----------calling fecthdate in useEffect-------------

    useEffect(() => {
        fetchdata()

    }, [])

    //.-----------The below code are for Pagination -----------

    const [currentPage, setCurrentPage] = useState(0);
    const [dropdown, setDropdown] = useState(10)
    const PER_PAGE = dropdown;
    const offset = currentPage * PER_PAGE;
    const currentPageData = store
        .slice(offset, offset + PER_PAGE)
        ;
    const pageCount = Math.ceil(store.length / PER_PAGE);

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

                    setModal(true)}>
                    Create Store
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
                    <tbody className="">

                        {
                            currentPageData.map((val) => {
                                return (

                                    <tr key={val.storeId} className="">
                                        <td className="">{val.name}</td>
                                        <td className="">{val.address}</td>
                                        <td className=""><Button style={{ backgroundColor: 'orange' }} onClick={() =>

                                            getSingle(val.storeId, () => setModalShow(true))}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                            &nbsp; Edit</Button></td>


                                        <td className=""><Button style={{ backgroundColor: 'orangered' }}
                                            onClick={() => {
                                                deleteStore(val.storeId, val.name)
                                                setName({ name: val.name })

                                            }}>
                                            <i className="fa-solid fa-trash"></i>
                                            &nbsp;   Delete
                                        </Button></td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>

                  {/* pagination code */}

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

                <DeleteModel
                    name={name.name}
                    header={'Delete Store'}

                    delete={() => del_Store(StoreId.current)}
                    open={open}
                    size={size}
                    onClose={() => dispatch({ type: 'close' })} />

               


                <CreateModal
                    name={'Store'}
                    fieldName={"address"}
                    entity={'store'}
                    onShow={() => setModal(true)}
                    open={modal}
                    size={'small'}
                    fetch={() => fetchdata()}
                    onClose={() =>

                        setModal(false)} />






                <UpdateModal
                    fieldName={"address"}
                    entity={'store'}
                    name={'Store'}
                    obj={update}
                    fetch={() => fetchdata()}
                    size={'small'}
                    open={modalShow}
                    onClose={() =>

                        setModalShow(false)}
                />









            </ div>
        </>
    );
}

export default Store



