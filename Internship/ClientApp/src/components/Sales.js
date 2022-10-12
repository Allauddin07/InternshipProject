import React, { useEffect, useRef, useState } from 'react';
import CreateSaleModal from './CreateSaleModal';
import DeleteModel from './DeleteModel';
import { Button, Modal, Select, Form } from 'semantic-ui-react'
import { format } from 'date-fns'
import DateFormate from './Date'
import dateF from './DateFormate'
import DatePicker from "react-datepicker";
//import DatePicker from "react-datepicker";  
import "react-datepicker/dist/react-datepicker.css";
import UpdateModal from './UpdateModal';

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
    const SaleId = useRef();




    const [name, setName]= useState({name:null})

    const [sale, setSale] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [customer, setCustomer] = useState([])
    const [store, setStore] = useState([])
    const [product, setProduct] = useState([])
    const [customerdata, setCustomerData] = useState({
        customerId: null
    })
    const [productdata, setProductData] = useState({
        productId: null
    })
    const [storedata, setStoreData] = useState({
        storeId: null
    })


    const [update, setUpdate] = useState({
        id: null,
        customerId: null,
        customer: null,
        productId: null,
        product: null,
        storeId: null,
        store: null,
        // dateSold: new Date()
    })

    const [cust, setCust] = useState({ cust: null })
    const [prod, setProd] = useState({ prod: null })
    const [stor, setStor] = useState({ stor: null })

    console.log(cust.cust)
    console.log(prod.prod)
    console.log(stor.stor)

    console.log(update)



    //console.log(dateF(new Date(update.dateSold)))

    const [modalShow, setModalShow] = useState(false);

    const [modal, setModal] = useState(false)


    const handleChange = (e) => {



        setUpdate((update) => {

            return {
                ...update,
                [e.target.name]: e.target.value
            }

        })



    }

    async function updateSale() {

        const body = {
            customerId: update.customerId,
            productId: update.productId,
            storeId: update.storeId,
            dateSold: startDate
        }

        const data = await fetch(`https://localhost:7144/api/sales/update/${update.id}`, {


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
        console.log(res)
        //setarr(res)
        fetchdata('sales', setSale)
        setModalShow(false)

    }

    async function fetchdata(dt, fun) {

        const data = await fetch(`https://localhost:7144/api/${dt}/getall`, {

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
        fun(res.result)

    }









    async function del_Sale(id) {



        const data = await fetch(`https://localhost:7144/api/sales/delete/${id}`, {

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

    }
    async function singleSale(id) {
        console.log(id)

        const data = await fetch(`https://localhost:7144/api/sales/singlesale/${id}`, {

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


    function getSingle(id, fun) {
        singleSale(id)
        //setModalShow(true)
        fun()
    }


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
        // fetchCustomer('customer', setCustomer)
        // fetchProduct('pro')
        // fetchStore()

    }, [])

    const CustomerOptions = customer.map((val) => {
        return {
            key: val.customerId,
            value: val.customerId,
            text: val.name
        }
    })


    const ProductOptions = product.map((val) => {
        return {
            key: val.productId,
            value: val.productId,
            text: val.name
        }
    })

    const StoreOptions = store.map((val) => {
        return {
            key: val.storeId,
            value: val.storeId,
            text: val.name
        }
    })




    return (

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
                        sale.map((val) => {
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
                                    onClick={() =>{
                                        deleteSale(val.saleId)
                                        setName({name:val.saleId})
                                        
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
                fetch={() => fetchdata('sales', setSale)}
                onClose={() =>
                    setModal(false)} />








            <UpdateModal
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

    );

}

export default Sales



