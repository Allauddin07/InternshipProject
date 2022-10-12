import React, { useEffect, useRef, useState } from 'react';
import CreateStoreModal from './CreateStoreModal';
import DeleteModel from './DeleteModel';
import { Button, Modal, Form } from 'semantic-ui-react'

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
function Store()
{
    const StoreId = useRef();
    const [name, setName]= useState({name:null})
    const [store, setStore] = useState([])
    const [update, setUpdate] = useState({
        id: null,
        name: null,
        address: null
    })

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

    async function updateStore() {

        const body = {
            name: update.name,
            address: update.address
        }

        const data = await fetch(`https://localhost:7144/api/store/update/${update.id}`, {

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

        const data = await fetch('https://localhost:7144/api/store/getall', {

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
        setStore(res.result)

    }



    async function del_Store(id) {



        const data = await fetch(`https://localhost:7144/api/store/delete/${id}`, {

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
    async function singleStore(id) {
        console.log(id)

        const data = await fetch(`https://localhost:7144/api/store/singlestore/${id}`, {

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


    useEffect(() => {
        fetchdata()

    }, [])




    return (

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
                        store.map((val) => {
                            return (

                                <tr key={val.storeId} className="">
                                    <td className="">{val.name}</td>
                                    <td className="">{val.address}</td>
                                    <td className=""><Button style={{backgroundColor:'orange'}} onClick={() =>

                                        getSingle(val.storeId, () => setModalShow(true))}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                       &nbsp; Edit</Button></td>


                                    <td className=""><Button style={{backgroundColor:'orangered'}}
                                     onClick={() =>{
                                        deleteStore(val.storeId, val.name)
                                        setName({name:val.name})
                                        
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

            <DeleteModel
             name={name.name}
             header={'Delete Store'}

                delete={() => del_Store(StoreId.current)}
                open={open}
                size={size}
                onClose={() => dispatch({ type: 'close' })} />

            <CreateStoreModal
                name={'Address'}
                
                open={modal}
                size={'small'}
                fetch={() => fetchdata()}
                onClose={() =>

                    setModal(false)} />













            <Modal
                size={'small'}
                open={modalShow}
                onClose={() =>

                    setModalShow(false)}


            >
                <Modal.Header>Delete Your Account</Modal.Header>
                <Modal.Content>
                    <Form.Input fluid name="name" label="Name" value={update.name} placeholder="Name" onChange={handleChange} />
                    <Form.Input fluid name="address" label="Address" value={update.address} onChange={handleChange} placeholder="Address" />
                </Modal.Content>
                {/* <Modal.Description>
                    <div className='contact_form_class'>
                        <div className='d-flex mb-5 mt-3'>

                            <div className='align-self-center '>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="form-group  flex-grow-1">
                                <input type="text" value={update.name} name="name" onChange={handleChange} />
                                <label >Name </label>
                            </div>

                        </div>

                        <div className='d-flex mb-5 mt-3'>

                            <div className='align-self-center '>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="form-group  flex-grow-1">
                                <input type="text" value={update.address} name="address" onChange={handleChange} />
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

                        updateStore()}>
                        Yes
                    </Button>
                </Modal.Actions>
            </Modal>



        </ div>

    );
}

export default Store



