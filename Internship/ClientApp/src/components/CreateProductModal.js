import React, {useState} from 'react'
import { Modal, Form, Button, Header } from "semantic-ui-react";

function CreateProductModal(props) {
    const [product, setProduct] = useState({
        
        name: null,
        price: null
    })

    

    const handleChange = (e) => {

       
            setProduct((product) => {

                return {
                    ...product,
                    [e.target.name]: e.target.value
                }
    
            })

       
    }


    
    

    async function createProduct(){

    
    

        const data = await fetch(`https://localhost:7144/api/product/create`, {

            method: "post",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true,
                'Access-Control-Allow-Origin': '*',



            },
            body: JSON.stringify(product)
        })

        const res = await data.json()
        console.log(res)
        //setarr(res)
       props.fetch()
       setProduct({
        name:null,
        price:null
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
                <Modal.Header>Create Product</Modal.Header>

                <Modal.Content>
                    <Form.Input fluid name="name" label="Name" value={product.name} placeholder="Name" onChange={handleChange} />
                    <Form.Input fluid name="price" label="$ Price" value={product.price} onChange={handleChange} placeholder="Price" />
                </Modal.Content>

               
                <Modal.Actions>
                    <Button negative onClick={props.onClose}>
                        Cancel
                    </Button>
                    <Button positive onClick={()=>createProduct()}>
                        Create
                    </Button>
                </Modal.Actions>
            </Modal>
    </div>
  )
}

export default CreateProductModal