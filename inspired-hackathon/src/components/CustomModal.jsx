import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";

function CustomModal(props) {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>EasyML Walkthrough</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{props.bodyText}</ModalBody>
                <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={props.onClose}>Thanks!</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default CustomModal;