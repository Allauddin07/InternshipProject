import React, { useEffect, useRef, useState } from 'react';
import DeleteModel from './DeleteModel'
import { Button, Modal, Form } from 'semantic-ui-react'

import CreateProductModal from './CreateProductModal';


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




function Product() {

    const productId = useRef();
    const [name, setName]= useState({name:null})

    const [arr, setarr] = useState([])

    const [modalShow, setModalShow] = useState(false);
    const [product, setProduct] = useState(false)

    const [dt, setData] = useState({
        id: null,
        name: null,
        price: null
    })


    const handleChange = (e) => {


        setData((dt) => {

            return {
                ...dt,
                [e.target.name]: e.target.value
            }

        })








    }

    async function singleProduct(id) {
        console.log(id)

        const data = await fetch(`https://localhost:7144/api/product/singleproduct/${id}`, {

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

        setData({
            id: res.productId,
            name: res.name,
            price: res.price
        })





    }

    function productDetail(id, show) {

        singleProduct(id)
        show()

    }


    async function updateProduct() {

        const body = {
            name: dt.name,
            price: dt.price
        }

        const data = await fetch(`https://localhost:7144/api/product/update/${dt.id}`, {

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
        setData({
            id: null,
            name: null,
            price: null
        })
        setModalShow(false)

    }




    async function fetchdata() {

        const data = await fetch('https://localhost:7144/api/product/getall', {

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

        console.log(id)

        const data = await fetch(`https://localhost:7144/api/product/delete/${id}`, {

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



    const deleteProduct = (id) => {

        dispatch({ type: 'open', size: 'small' })
        productId.current = id
       

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

                setProduct(true)}>
                Create Product
            </Button>
            <table className="ui celled table">
                <thead className="">
                    <tr className="">
                        <th className="">Name</th>
                        <th className="">Price</th>
                        <th className="">Action</th>
                        <th className="">Action</th>
                    </tr>
                </thead>
                <tbody className="">

                    {

                        arr.map((val, id) => {
                            return (

                                <tr key={val.productId} className="">
                                    <td className="">{val.name}</td>
                                    <td className="">{val.price}</td>






                                    <td>
                                        <Button style={{ backgroundColor: 'orange' }} onClick={() => productDetail(val.productId, setModalShow(true))}>
                                            <i className="fa-solid fa-pen-to-square"></i>

                                            &nbsp; Eidt
                                        </Button>
                                    </td>

                                    <td>
                                        <Button style={{ backgroundColor: 'orangered' }} onClick={() =>{
                                            deleteProduct(val.productId)
                                            setName({name:val.name})
                                            
                                            }}>
                                            <i className="fa-solid fa-trash"></i>
                                            &nbsp;  Delete
                                        </Button>
                                    </td>





                                </tr>

                            )
                        })
                    }


                </tbody>
            </table>




            <DeleteModel
                name={name.name}
                header={'Delete Product'}

                delete={() => del(productId.current)}
                open={open}
                size={size}
                onClose={() => dispatch({ type: 'close' })} />

            <CreateProductModal
                fetch={() => fetchdata()}


                open={product}
                size={'small'}
                onClose={() => setProduct(false)} />







            <Modal
                size={'small'}
                open={modalShow}
                onClose={() =>

                    setModalShow(false)}


            >
                <Modal.Header>Delete Your Account</Modal.Header>
                <Modal.Content>
                    <Form.Input fluid name="name" label="Name" value={dt.name} placeholder="Name" onChange={handleChange} />
                    <Form.Input fluid name="price" label="$ Price" value={dt.price} onChange={handleChange} placeholder="Price" />
                </Modal.Content>
                {/* <Modal.Description>
                    <div NameName='contact_form_class'>
                        <div className='d-flex mb-5 mt-3'>

                            <div className='align-self-center '>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="form-group  flex-grow-1">
                                <input type="text" value={dt.name} name="name" onChange={handleChange} />
                                <label >Name </label>
                            </div>

                        </div>

                        <div className='d-flex mb-5 mt-3'>

                            <div className='align-self-center '>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="form-group  flex-grow-1">
                                <input type="text" value={dt.price} name="price" onChange={handleChange} />
                                <label >price </label>
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

                        updateProduct()}>
                        Yes
                    </Button>
                </Modal.Actions>
            </Modal>



        </ div>
    );

}
export default Product