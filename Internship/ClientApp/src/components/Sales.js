import React, { useEffect, useRef, useState } from 'react';
import CreateSaleModal from './CreateSaleModal';
import DeleteModel from './DeleteModel';
import { Button, Form } from 'semantic-ui-react'
import DateFormate from './Date'
import "react-datepicker/dist/react-datepicker.css";
import UpdateSalesModal from './UpdateSalesModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

function Sales() {

    //--------Created CustomerId Variable to store CustomerId-------
    const SaleId = useRef();

    //--------Created Name Variable to store Customer Name-------
    const [name, setName] = useState({ name: null })

    //--------Created arr State to hold List of all Customer-------
    const [sale, setSale] = useState([])

    //----------Declare StatDate Variable to store date value
    const [startDate, setStartDate] = useState(new Date());

    //----------Declare customer Variable to store customaer value
    const [customer, setCustomer] = useState([])

    //----------Declare store Variable to hold store value
    const [store, setStore] = useState([])

    //----------Declare product Variable to store product value
    const [product, setProduct] = useState([])

    // -------------Success message if user created or updated------------
    const success = (mg) => toast.success(mg, {
        position: "top-center",
        autoClose: 2000
    });

    //----------This function will show deleted message--------
    const error = (mg) => toast.error(mg, {
        position: "top-center",
        autoClose: 2000
    });


    //----------Declare update Variable to store sale updated value
    const [update, setUpdate] = useState({
        id: null,
        customerId: null,
        customer: null,
        productId: null,
        product: null,
        storeId: null,
        store: null,

    })

    //----------Declare modalshow Variable to show Create Modal
    const [modalShow, setModalShow] = useState(false);

    //----------Declare modal Variable to show updateModal

    const [modal, setModal] = useState(false)

    // ----------this function will update the Sale------------
    async function updateSale() {

        const body = {
            customerId: update.customerId,
            productId: update.productId,
            storeId: update.storeId,
            dateSold: startDate
        }

        const data = await fetch(`https://internshipproject.azurewebsites.net/api/sales/update/${update.id}`, {


            method: "put",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true,
                'Access-Control-Allow-Origin': '*',



            },
            body: JSON.stringify(body)
        })

        const res = await data.json()
        fetchdata('sales', setSale)
        setModalShow(false)
        success(res)

    }

    // ----------this function will fetch all sales from server------------
    async function fetchdata(dt, fun) {

        const data = await fetch(`https://internshipproject.azurewebsites.net/api/${dt}/getall`, {

            method: "get",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true,
                'Access-Control-Allow-Origin': '*',



            }
        })

        const res = await data.json()

        fun(res.result.reverse())

    }

    // ----------this function will delete the single Sale------------
    async function del_Sale(id) {



        const data = await fetch(`https://internshipproject.azurewebsites.net/api/sales/delete/${id}`, {

            method: "delete",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true,
                'Access-Control-Allow-Origin': '*',



            }
        })

        const res = await data.json()
        console.log(res.result)
        fetchdata('sales', setSale)

        error(res)

    }

    // ----------this function will fetch detail of the single Sale------------
    async function singleSale(id) {
        console.log(id)

        const data = await fetch(`https://internshipproject.azurewebsites.net/api/sales/singlesale/${id}`, {

            method: "get",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true,
                'Access-Control-Allow-Origin': '*',



            }


        })

        const res = await data.json()
        console.log(res)

        setUpdate({
            id: res.saleId,
            customerId: res.customerId,
            customer: res.customer,
            productId: res.productId,
            product: res.product,
            storeId: res.storeId,
            store: res.store,
            //dateSold: new Date(res.dateSold)
        })
        setStartDate(new Date(res.dateSold))





    }

    // called singleSale function here--------
    function getSingle(id, fun) {
        singleSale(id)
        //setModalShow(true)
        fun()
    }

// callled del_Sale function here----------
    const deleteSale = (id) => {

        dispatch({ type: 'open', size: 'small' })
        SaleId.current = id

    }


    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        size: undefined,
    })
    const { open, size } = state


    useEffect(() => {
        fetchdata('sales', setSale)
        fetchdata('customer', setCustomer)
        fetchdata('product', setProduct)
        fetchdata('store', setStore)


    }, [])





    // -----------Pagination Code------------------

    const [currentPage, setCurrentPage] = useState(0);
    const [dropdown, setDropdown] = useState(10)
    const PER_PAGE = dropdown;
    const offset = currentPage * PER_PAGE;
    const currentPageData = sale
        .slice(offset, offset + PER_PAGE)
        ;
    const pageCount = Math.ceil(sale.length / PER_PAGE);

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
                    Create Sale
                </Button>
                <table className="ui celled table">
                    <thead className="">
                        <tr className="">
                            <th className="">Customer</th>
                            <th className="">Product</th>
                            <th className="">Store</th>
                            <th className="">DateSold</th>
                            <th className="">Action</th>
                            <th className="">Action</th>
                        </tr>
                    </thead>
                    <tbody className="">

                        {
                            currentPageData.map((val) => {
                                return (

                                    <tr key={val.saleId} className="">
                                        <td className="">{val.customer}</td>
                                        <td className="">{val.product}</td>
                                        <td className="">{val.store}</td>
                                        <td className="">{DateFormate(new Date(val.dateSold))}</td>
                                        <td className=""><Button style={{ backgroundColor: 'orange' }} onClick={() =>

                                            getSingle(val.saleId, () => setModalShow(true))}>
                                            <i className="fa-solid fa-pen-to-square"></i>

                                            &nbsp; Edit</Button></td>


                                        <td className=""><Button style={{ backgroundColor: 'orangered' }}
                                            onClick={() => {
                                                deleteSale(val.saleId)
                                                setName({ name: val.saleId })

                                            }}>
                                            <i className="fa-solid fa-trash"></i>
                                            &nbsp;      Delete
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

                {/*-----------Deleting Modal---------- */}
                <DeleteModel
                    name={`SaleID ${name.name}`}
                    header={'Delete Sale'}
                    delete={() => del_Sale(SaleId.current)}
                    open={open}
                    size={size}
                    onClose={() => dispatch({ type: 'close' })} />

                <CreateSaleModal
                    customer={customer}
                    product={product}
                    store={store}
                    open={modal}
                    size={'small'}
                    onShow={() => setModal(true)}
                    fetch={() => fetchdata('sales', setSale)}
                    onClose={() =>
                        setModal(false)} />








                <UpdateSalesModal
                    as={Form}
                    size={'small'}
                    open={modalShow}
                    customer={customer}
                    product={product}

                    store={store}
                    update={update}
                    onClose={() =>

                        setModalShow(false)}

                    updateSale={updateSale}
                    setUpdate={setUpdate}
                    startDate={startDate}
                    setStartDate={setStartDate}
                />






            </ div>
        </>

    );

}

export default Sales



