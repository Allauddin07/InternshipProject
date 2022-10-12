
import { id } from 'date-fns/locale'
import React, { useEffect, useState } from 'react'
import { Button,  Modal } from 'semantic-ui-react'



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
                    <p>Are you sure you want to delete {props.name}  </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={()=>props.onClose()}>
                        No
                    </Button>
                    <Button positive onClick={()=>{
                        props.delete()
                        props.onClose()
                    }}>
                        Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default DeleteModel