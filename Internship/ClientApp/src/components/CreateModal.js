import React, { useState } from 'react'
import { Modal, Form, Button, Message } from "semantic-ui-react";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateModal(props) {

    //---------Creating Validation Error

    const [error, setError] = useState({ error: '' })

    //---------Storing input value 

    const [object, setObject] = useState({

        name: '',
        address: '',
        price:''
    })

    console.log(object.name)
    console.log(object.price)

    //---------Creating Success message if object is created successfully----

    const success = (mg) => toast.success(mg, {
        position: "top-center",
        autoClose: 2000
    });

    

//---------Input OnChnage method

    const handleChange = (e) => {

        setObject((prev) => {

            return {
                ...prev,
                [e.target.name]: e.target.value
            }

        })

    }





    async function createObject() {

        if (props.fieldName=="address"){

            if (object.name==='' && object.address==='') {
                props.onShow()
                setError({ error: ' All fields are required' })
                
            }

            else {

                const body={
                    name:object.name,
                    address:object.address
                }

                const data = await fetch(`https://internshipproject.azurewebsites.net/api/${props.entity}/create`, {
    
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
                props.fetch()
                setObject({
                    name: '',
                    address: '',
                    price:''
                })
                props.onClose()
                success(res)
    
            }

        }

        else{

            if (object.name==='' && object.price==='') {
                props.onShow()
                setError({ error: ' All fields are required' })
                
            }

            else {

                const obj={
                    name:object.name,
                    price:object.price
                }
console.log(obj)
                const data = await fetch(`https://internshipproject.azurewebsites.net/api/${props.entity}/create`, {
    
                    method: "post",
    
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Credentials": true,
                        'Access-Control-Allow-Origin': '*',
    
                    },
                    body: JSON.stringify(obj)
                })
    
                const res = await data.json()
                props.fetch()
                setObject({
                    name: '',
                    address: '',
                    price:''
                })
                props.onClose()
                success(res)
    
            }

        }


       





    }





    return (
        <div>

            <Modal
                size={props.size}
                open={props.open}
                onClose={props.onClose}


            >
                <Modal.Header>Create {props.name}</Modal.Header>

                {error.error && <Message negative>
                    <Message.Header>{error.error}</Message.Header>

                </Message>}


                <Modal.Content>
                    <Form.Input style={{marginBottom: "1rem"}} fluid name="name" label="Name" 
                    value={object.name} placeholder="Name" onChange={handleChange} />

                    <Form.Input fluid name={props.fieldName==="address"?"address":"price"}
                     label={props.fieldName=="address"?"Address":" $ Price"}
                      value={props.fieldName=="address"?object.address:object.price} onChange={handleChange} 
                      placeholder={props.fieldName=="address"?"Address":"Price"} />
                </Modal.Content>


                <Modal.Actions>
                    <Button negative onClick={()=>{
                        props.onClose()
                        setError({error:''})
                    }}>
                        Cancel
                    </Button>
                    <Button positive onClick={() => createObject()}>
                        Create
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default CreateModal