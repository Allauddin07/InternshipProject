import React, {useState} from 'react'
import { Button, Modal, Select, Form } from 'semantic-ui-react'
import DatePicker from "react-datepicker";

const UpdateModal = (props) => {

    // const [update, setUpdate] = useState({
    //     id: null,
    //     customerId: null,
    //     customer: null,
    //     productId: null,
    //     product: null,
    //     storeId: null,
    //     store: null,
    //     // dateSold: new Date()
    // })


    const CustomerOptions = props.customer.map((val) => {
        return {
            key: val.customerId,
            value: val.customerId,
            text: val.name
        }
    })


    const ProductOptions = props.product.map((val) => {
        return {
            key: val.productId,
            value: val.productId,
            text: val.name
        }
    })

    const StoreOptions = props.store.map((val) => {
        return {
            key: val.storeId,
            value: val.storeId,
            text: val.name
        }
    })

    // async function updateSale() {

    //     const body = {
    //         customerId: update.customerId,
    //         productId: update.productId,
    //         storeId:update.storeId,
    //         dateSold:startDate
    //     }

    //     const data = await fetch(`https://localhost:7144/api/sales/update/${update.id}`, {
            

    //         method: "put",

    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             "Access-Control-Allow-Credentials": true,
    //             'Access-Control-Allow-Origin': '*',



    //         },
    //         body: JSON.stringify(body)
    //     })

    //     const res = await data.json()
    //     console.log(res)
    //     //setarr(res)
    //     fetchdata('sales', setSale)
    //     setModalShow(false)

    // }
    return (
        <div> <Modal
            as={Form}
            size={'small'}
            open={props.open}
            onClose={props.onClose}


        >
            <Modal.Header>Update Sale</Modal.Header>
            <Modal.Content>

                <Select style={{ marginBottom: '1.5rem' }} fluid placeholder='Select Customer' value={props.update.customerId} options={CustomerOptions}
                    onChange={(e, data) => props.setUpdate((prev) => {
                        return {
                            ...prev,
                            customerId: data.value
                        }
                    })} />

                <Select style={{ marginBottom: '1.5rem' }} fluid placeholder='Select Product' value={props.update.productId} name="product"
                    onChange={(e, data) => props.setUpdate((prev) => {
                        return {
                            ...prev,
                            productId: data.value
                        }
                    })
                    } options={ProductOptions} />

                <Select style={{ marginBottom: '1.5rem' }} fluid placeholder='Select Store' value={props.update.storeId} name="store"
                    onChange={(e, data) => props.setUpdate((prev) => {
                        return {
                            ...prev,
                            storeId: data.value
                        }
                    })} options={StoreOptions} />
                <div className="form-group  flex-grow-1">

                    <label >DateSold</label>
                    <DatePicker fluid name="dateSold" selected={props.startDate} onChange={(date) => props.setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                    />
                </div>

            </Modal.Content>


            <Modal.Actions>
                <Button negative onClick={() =>

                    props.onClose()}>
                    No
                </Button>
                <Button positive onClick={() =>

                    props.updateSale()}>
                    Yes
                </Button>
            </Modal.Actions>
        </Modal>
        </div>
    )
}

export default UpdateModal