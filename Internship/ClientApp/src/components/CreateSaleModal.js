import React, { useEffect, useState } from 'react'
//import { Button, Modal } from 'semantic-ui-react'
import fetchData from './FetchData'
import DatePicker from "react-datepicker";
//import DatePicker from "react-datepicker";  
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Form, Button, Header, Select, Dropdown } from "semantic-ui-react";




const CreateSaleModal = (props) => {
    const [startDate, setStartDate] = useState(new Date());


    const customer = props.customer
    const product = props.product
    const store = props.store
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





    const [sale, setSale] = useState({
        customerId: null,
        customer: null,
        productId: null,
        product: null,
        storeId: null,
        store: null,
        //dateSold: null
    })

    //console.log(sale)









    const handleChange = (e) => {


        setSale((sale) => {

            return {
                ...sale,
                [e.target.name]: e.target.value
            }

        })
        
    }
    const [cust, setCust] = useState({ cust: null })
    const [prod, setProd] = useState({ prod: null })
    const [stor, setStor] = useState({ stor: null })

    console.log(cust.cust)
    console.log(prod.prod)
    console.log(stor.stor)

   




    async function createSale() {


        const body = {
            customerId: cust.cust,
            productId: prod.prod,
            storeId: stor.stor,
            dateSold: startDate
        }

        console.log(body)






        const data = await fetch(`https://localhost:7144/api/sales/create`, {

            method: "post",

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
        props.fetch()


        setSale({

            customer: null,
            product: null,
            store: null,
            //dateSold: null
        })

        setCust({
            cust:null
        })
        setStor({
            cust:null
        })
        setProd({
            cust:null
        })
        setStartDate(null)
        props.onClose()


    }





    return (
        <div>

            <Modal as={Form}
                size={props.size}
                open={props.open}
                onClose={props.onClose}


            >
                <Header content="Create Sale" />

                <Modal.Content>

                    <Select style={{ marginBottom: '1.5rem' }} fluid placeholder='Select Customer' selection value={cust.cust} options={CustomerOptions} 
                     onChange={(e, data)=>{
                        setCust({cust:data.value})
                     }} />

                    <Select style={{ marginBottom: '1.5rem' }} fluid placeholder='Select Product' value={prod.prod} name="product"
                     onChange={(e, data) => {

                        setProd({ prod:data.value })
                
                    }
                } options={ProductOptions} />

                    <Select style={{ marginBottom: '1.5rem' }} fluid placeholder='Select Store' value={stor.stor} name="store"
                     onChange={(e, data) => {

                        setStor({ stor: data.value })
                
                    }} options={StoreOptions} />
                    <div className="form-group  flex-grow-1">

                        <label >DateSold</label>
                        <DatePicker name="dateSold" selected={startDate} onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                </Modal.Content>

                {/* <Modal.Description>
                    <div className='contact_form_class'>
                        <div className='d-flex mb-5 mt-3'>

                            <div className='align-self-center '>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="form-group  flex-grow-1">
                                <select value={sale.customer}
                                    name="customer" onChange={handleChange}>
                                    <option hidden></option>
                                    {customer.map((v) => {
                                        return (
                                            <option value={v.customerId} key={v.customerId} > {v.name}</option>
                                        )
                                    })}


                                </select>
                            </div>

                        </div>

                        <div className='d-flex mb-5 mt-3'>

                            <div className='align-self-center '>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="form-group  flex-grow-1">
                                <select value={sale.product}
                                    name="product" onChange={handleChange}>
                                    <option  hidden ></option>
                                    {product.map((v) => {
                                        return (
                                            <option value={v.productId} key={v.productId} >  {v.name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                        </div>

                        <div className='d-flex mb-5 mt-3'>

                            <div className='align-self-center '>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="form-group  flex-grow-1">
                                <select value={sale.store}
                                    name="store" onChange={handleChange}>
                                    <option hidden></option>
                                    {store.map((v) => {
                                        return (
                                            <option value={v.storeId} key={v.storeId} >  {v.name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                        </div>

                        <div className='d-flex mb-5 mt-3'>

                            <div className='align-self-center '>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="form-group  flex-grow-1">

                                <label >DateSold</label>
                                <DatePicker name="dateSold" selected={startDate} onChange={(date) => setStartDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>

                        </div>

                    </div>


                </Modal.Description> */}
                <Modal.Actions>
                    <Button negative onClick={props.onClose}>
                        Cancel
                    </Button>
                    <Button positive onClick={() => createSale()}>
                        Create
                    </Button>
                </Modal.Actions>
            </Modal>



        </div>
    )
}

export default CreateSaleModal