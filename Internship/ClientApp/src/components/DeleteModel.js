
import React from 'react'
import { Button,  Modal } from 'semantic-ui-react'
import 'react-toastify/dist/ReactToastify.css';




const DeleteModel = (props) => {

    

    return (
        <>
            <Modal
                size={props.size}
                open={props.open}
                onClose={props.onClose}     
            >
                <Modal.Header>{props.header}</Modal.Header>
                <Modal.Content>
                    <h4> Are you sure you want to delete  {props.name}  </h4>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={()=>props.onClose()}>
                        Cancel
                    </Button>
                    <Button positive onClick={()=>{
                        props.delete()
                        props.onClose()
                    }}>
                        Delete
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default DeleteModel