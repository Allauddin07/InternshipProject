import React, { useState } from 'react'
import { Modal, Form, Button, Header } from "semantic-ui-react";


function CreateCustomerModal(props) {


    const [customer, setCustomer] = useState({

        name: null,
        address: null
    })



    const handleChange = (e) => {


        setCustomer((customer) => {

            return {
                ...customer,
                [e.target.name]: e.target.value
            }

        })








    }





    async function createCustomer() {




        const data = await fetch(`https://localhost:7144/api/customer/create`, {

            method: "post",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true,
                'Access-Control-Allow-Origin': '*',



            },
            body: JSON.stringify(customer)
        })

        const res = await data.json()
        console.log(res)
        //setarr(res)
        props.fetch()
        setCustomer({
            name: null,
            address: null
        })
        props.onClose()


    }





    return (
        <div>

            <Modal
                size={props.size}
                open={props.open}
                onClose={props.onClose}


            >
                <Modal.Header>Create Customer</Modal.Header>

                <Modal.Content>
                    <Form.Input fluid name="name" label="Name" value={customer.name} placeholder="Name" onChange={handleChange} />
                    <Form.Input fluid name="address" label="Address" value={customer.address} onChange={handleChange} placeholder="Address" />
                </Modal.Content>


                <Modal.Actions>
                    <Button negative onClick={props.onClose}>
                        Cancel
                    </Button>
                    <Button positive onClick={() => createCustomer()}>
                        Create
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default CreateCustomerModal