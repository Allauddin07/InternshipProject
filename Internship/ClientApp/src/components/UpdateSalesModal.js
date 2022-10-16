import React from 'react'
import { Button, Modal, Select, Form } from 'semantic-ui-react'
import DatePicker from "react-datepicker";

const UpdateSalesModal = (props) => {

    //----------Creating Customer Options for Select Sementic-ui-react---------------->

    const CustomerOptions = props.customer.map((val) => {
        return {
            key: val.customerId,
            value: val.customerId,
            text: val.name
        }
    })

    //----------Creating Product Options for Select Sementic-ui-react---------------->

    const ProductOptions = props.product.map((val) => {
        return {
            key: val.productId,
            value: val.productId,
            text: val.name
        }
    })

    //----------Creating Store Options for Select Sementic-ui-react---------------->

    const StoreOptions = props.store.map((val) => {
        return {
            key: val.storeId,
            value: val.storeId,
            text: val.name
        }
    })

   //-------------------Update Sales Modal------------>
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
                    Cancel
                </Button>
                <Button positive onClick={() =>

                    props.updateSale()}>
                    Update
                </Button>
            </Modal.Actions>
        </Modal>
        </div>
    )
}

export default UpdateSalesModal