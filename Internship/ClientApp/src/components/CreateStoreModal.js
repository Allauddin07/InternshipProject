import React, { useState } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'


const CreateStoreModal = (props) => {
    const [store, setStore] = useState({

        name: null,
        address: null
    })



    const handleChange = (e) => {


        setStore((store) => {

            return {
                ...store,
                [e.target.name]: e.target.value
            }

        })








    }





    async function createStore() {




        const data = await fetch(`https://localhost:7144/api/store/create`, {

            method: "post",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true,
                'Access-Control-Allow-Origin': '*',



            },
            body: JSON.stringify(store)
        })

        const res = await data.json()
        console.log(res)
        //setarr(res)
        props.fetch()
        setStore({
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
                <Modal.Header>Create Store</Modal.Header>

                <Modal.Content>
                    <Form.Input fluid name="name" label="Name" value={store.name} placeholder="Name" onChange={handleChange} />
                    <Form.Input fluid name="address" label="Address" value={store.address} onChange={handleChange} placeholder="Address" />
                </Modal.Content>


                <Modal.Actions>
                    <Button negative onClick={props.onClose}>
                    Cancel
                    </Button>
                    <Button positive onClick={() => createStore()}>
                        Create
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default CreateStoreModal