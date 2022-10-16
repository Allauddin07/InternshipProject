import React, { useEffect, useRef, useState } from 'react';
import DeleteModel from './DeleteModel'
import { Button } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateModal from './CreateModal'
import UpdateModal from './UpdateModal';
import Pagination from './Pagination';
import { Select, Menu } from 'semantic-ui-react'






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

    //--------Created productId Variable to store ProductId-------
    const productId = useRef();

    //--------Created Name Variable to store Product Name-------
    const [name, setName] = useState({ name: null })

    //--------Created arr State to hold List of all Product-------f
    const [arr, setarr] = useState([])

    //--------Created modelshow State to show UpdateModal-------
    const [modalShow, setModalShow] = useState(false);

    //--------Created modelshow State to show CreatedModal-------
    const [product, setProduct] = useState(false)

    //--------Created st State to hold Deatil of single Product-------
    const [dt, setData] = useState({
        id: null,
        name: null,
        price: null
    })

    //----------Deletion message function if Product is deleted-------
    const error = (mg) => toast.error(mg, {
        position: "top-center",
        autoClose: 5000
    });


    //-----------This function will fetch single customer deatil---------------
    async function singleProduct(id) {
        console.log(id)

        const data = await fetch(`https://internshipproject.azurewebsites.net/api/product/singleproduct/${id}`, {

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

    //-----------Called singleCustomer Func in this function-------------

    function productDetail(id, show) {

        singleProduct(id)
        show()

    }

    // ----------This function will fetch all Product-------------
    async function fetchdata() {

        const data = await fetch('https://internshipproject.azurewebsites.net/api/product/getall', {

            method: "get",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true,
                'Access-Control-Allow-Origin': '*',



            }
        })

        const res = await data.json()
        setarr(res.result.reverse())

    }


    // ----------This function will delete single Porduct-------------
    async function del_product(id) {

        const data = await fetch(`https://internshipproject.azurewebsites.net/api/product/delete/${id}`, {

            method: "delete",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true,
                'Access-Control-Allow-Origin': '*',



            }
        })

        const res = await data.json()

        fetchdata()
        error(res)

    }


    //------Showing Delete Modal and storing id in ProductId----------
    const deleteProduct = (id) => {

        dispatch({ type: 'open', size: 'small' })
        productId.current = id


    }

//--------Created state for Delete Modal ------------------>
    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        size: undefined,
    })
    const { open, size } = state

 //---------Called fetch method in useEffect-----------
    useEffect(() => {
        fetchdata()

    }, [])



    const [currentPage, setCurrentPage] = useState(0);
    const [dropdown, setDropdown] = useState(10)
    const PER_PAGE = dropdown;
    const offset = currentPage * PER_PAGE;
    const currentPageData = arr
        .slice(offset, offset + PER_PAGE)
        ;
    const pageCount = Math.ceil(arr.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const options = [
        { key: 1, text: 'Show 5 items', value: 5 },
        { key: 2, text: 'Show 10 items ', value: 10 },
        { key: 3, text: 'Show 15 items ', value: 15 },
    ]



    return (
        <>
            <ToastContainer position="top-center"
                autoClose={5000} />
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

                            currentPageData.map((val, id) => {
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
                                            <Button style={{ backgroundColor: 'orangered' }} onClick={() => {
                                                deleteProduct(val.productId)
                                                setName({ name: val.name })

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

                <div className='showItem'>
                    <div className='dropdown'>
                        <Menu compact>
                            <Select onChange={(e, data) => {
                                setDropdown(data.value)
                            }} value={dropdown} options={options} item />
                        </Menu>
                    </div>


                    <Pagination

                        handlePageClick={handlePageClick}
                        pageCount={pageCount}
                    />
                </div>




                <DeleteModel
                    name={name.name}
                    header={'Delete Product'}
                    delete={() => del_product(productId.current)}
                    open={open}
                    size={size}
                    onClose={() => dispatch({ type: 'close' })} />


                <CreateModal
                    fetch={() => fetchdata()}
                    entity={'product'}
                    fieldName={"product"}
                    name={'Product'}

                    onShow={() => setProduct(true)}
                    open={product}
                    size={'small'}
                    onClose={() => setProduct(false)} />



                <UpdateModal
                    fieldName={"price"}
                    entity={'product'}
                    name={'Product'}
                    obj={dt}
                    fetch={() => fetchdata()}
                    size={'small'}
                    open={modalShow}
                    onClose={() =>
                        setModalShow(false)}

                />







            </ div>
        </>
    );

}
export default Product