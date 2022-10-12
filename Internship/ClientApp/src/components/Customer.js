import React, { useEffect, useRef, useState } from 'react';
import CreateCustomerModal from './CreateCustomerModal';
import DeleteModel from './DeleteModel';
import { Button, Modal, Form } from 'semantic-ui-react'

//import { updateLanguageServiceSourceFile } from 'typescript';


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

    const CustomerId = useRef();
    const [name, setName]= useState({name:null})

   // localStorage.setItem("id", JSON.stringify(CustomerId))





    const [arr, setarr] = useState([])

    console.log(arr)
    

    const [st, setSt] = useState({
        id: null,
        name: null,
        address: null
    })

    const [modalShow, setModalShow] = useState(false);

    const [customer, setCustomer] = useState(false)


    const handleChange = (e) => {



        setSt((st) => {

            return {
                ...st,
                [e.target.name]: e.target.value
            }

        })



    }

    async function updateCustomer() {

        const body = {
            name: st.name,
            address: st.address
        }

        const data = await fetch(`https://localhost:7144/api/customer/update/${st.id}`, {

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
        fetchdata()
        setModalShow(false)

    }

    async function fetchdata() {

        const data = await fetch("https://localhost:7144/api/customer/getall", {

            method: "get",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true,
                'Access-Control-Allow-Origin': '*',



            }
        })

        const res = await data.json()
        console.log(res.result)
        setarr(res.result)

    }



    async function del(id) {



        const data = await fetch(`https://localhost:7144/api/customer/delete/${id}`, {

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
        fetchdata()

    }
    async function singleCustomer(id) {
        console.log(id)

        const data = await fetch(`https://localhost:7144/api/customer/singlecustomer/${id}`, {

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


    function getSingle(id, fun) {
        singleCustomer(id)
        //setModalShow(true)
        fun()
    }


    const deleteCustomer = (id) => {

        dispatch({ type: 'open', size: 'small' })
        CustomerId.current = id
        

    }


    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        size: undefined,
    })
    const { open, size } = state


    useEffect(() => {
        fetchdata()
       

    }, [])


    





    return (

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
                <tbody className="">

                    {
                        arr.map((val) => {
                            return (

                                <tr key={val.customerId} className="">
                                    <td className="">{val.name}</td>
                                    <td className="">{val.address}</td>
                                    <td className=""><Button style={{backgroundColor:'orange'}} onClick={() =>

                                        getSingle(val.customerId, () => setModalShow(true))}>
                                            <i className="fa-solid fa-pen-to-square" ></i> 
                                            &nbsp; Edit</Button></td>


                                    <td className=""><Button style={{backgroundColor:'orangered'}} 
                                    onClick={() =>{
                                        deleteCustomer(val.customerId)
                                        setName({name:val.name})
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

            <DeleteModel
            name={name.name}
header={'Delete Customer'}
            customerId={CustomerId.current}

                delete={() => del(CustomerId.current)}
                open={open}
                size={size}
                onClose={() => dispatch({ type: 'close' })} />

            <CreateCustomerModal
                name={'Address'}
                api={'customer'}
                open={customer}
                size={'small'}
                fetch={() => fetchdata()}
                onClose={() =>

                    setCustomer(false)} />













            <Modal
                size={'small'}
                open={modalShow}
                onClose={() =>

                    setModalShow(false)}


            >
                <Modal.Header>Delete Your Account</Modal.Header>
                <Modal.Content>
                    <Form.Input fluid name="name" label="Name"  value={st.name} placeholder="Name" onChange={handleChange} />
                    <Form.Input fluid name="address" label="Address" value={st.address} onChange={handleChange} placeholder="Address" />
                </Modal.Content>
                {/* <Modal.Description>
                    <div className='contact_form_class'>
                        <div className='d-flex mb-5 mt-3'>

                            <div className='align-self-center '>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="form-group  flex-grow-1">
                                <input type="text" value={st.name} name="name" onChange={handleChange} />
                                <label >Name </label>
                            </div>

                        </div>

                        <div className='d-flex mb-5 mt-3'>

                            <div className='align-self-center '>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="form-group  flex-grow-1">
                                <input type="text" value={st.address} name="address" onChange={handleChange} />
                                <label >Address </label>
                            </div>

                        </div>

                    </div>

                </Modal.Description> */}
                <Modal.Actions>
                    <Button negative onClick={() =>

                        setModalShow(false)}>
                        No
                    </Button>
                    <Button positive onClick={() =>

                        updateCustomer()}>
                        Yes
                    </Button>
                </Modal.Actions>
            </Modal>



        </ div>

    );

}

export default Customer



