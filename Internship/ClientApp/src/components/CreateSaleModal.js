import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Form, Button, Header, Select, Message } from "semantic-ui-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateSaleModal = (props) => {


    //-----------creating Date State-------------------->
    const [startDate, setStartDate] = useState(new Date());

    //-------getting all customer in List--------->
    const customer = props.customer

    //-------getting all product in List--------->
    const product = props.product

    //-------getting all store in List--------->
    const store = props.store

    //--------creating Select options for Customer-----> 
    const CustomerOptions = customer.map((val) => {
        return {
            key: val.customerId,
            value: val.customerId,
            text: val.name
        }
    })

    //-------- creating Select option for Product----------
    const ProductOptions = product.map((val) => {
        return {
            key: val.productId,
            value: val.productId,
            text: val.name
        }
    })

    //---------creating Select option for Store---------
    const StoreOptions = store.map((val) => {
        return {
            key: val.storeId,
            value: val.storeId,
            text: val.name
        }
    })


    //--------created Validation Error state---------- 
    const [error, setError] = useState({ error: '' })

    //---------created customer state for Select Semantic UI-------------
    const [cust, setCust] = useState({ cust: '' })

    //---------created Product state for Select Semantic UI-------------
    const [prod, setProd] = useState({ prod: '' })

    //---------created Sale state for Select Semantic UI-------------
    const [stor, setStor] = useState({ stor: '' })
   
    //--------Created function for creating Sale and made network request----------
    async function createSale() {



        if ((cust.cust === '') && (prod.prod === '') && (stor.stor === '')) {
            props.onShow()
            setError({ error: ' All fields are required' })

        }
        else {
            if (new Date(startDate).getTime()<=new Date().getTime()){
                props.onShow()
                setError({error:'The Date must be Bigger or Equal to today date'})
            }

            else{
                const body = {
                    customerId: cust.cust,
                    productId: prod.prod,
                    storeId: stor.stor,
                    dateSold: startDate
                }
    
    
                const data = await fetch(`https://internshipproject.azurewebsites.net/api/sales/create`, {
    
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
    
    
               
    
                setCust({
                    cust: null
                })
                setStor({
                    cust: null
                })
                setProd({
                    cust: null
                })
                setStartDate(null)
                props.onClose()
                success(res)
            }
          
        }




    }

    //--------Created Success Message if Obj is Created Successfully---------------
    const success = (mg) => toast.success(mg, {
        position: "top-center",
        autoClose: 2000
    });


    return (
        <div>

            <Modal as={Form}
                size={props.size}
                open={props.open}
                onClose={props.onClose}


            >
                <Header content="Create Sale" />

                {error.error && <Message negative>
                    <Message.Header>{error.error}</Message.Header>

                </Message>}

                <Modal.Content>

                    <Select style={{ marginBottom: '1.5rem' }} fluid placeholder='Select Customer' selection value={cust.cust} options={CustomerOptions}
                        onChange={(e, data) => {
                            setCust({ cust: data.value })
                        }} />

                    <Select style={{ marginBottom: '1.5rem' }} fluid placeholder='Select Product' value={prod.prod} name="product"
                        onChange={(e, data) => {

                            setProd({ prod: data.value })

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


                <Modal.Actions>
                    <Button negative onClick={() => {
                        props.onClose()
                        setError({ error: '' })
                    }}>
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