import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from "@chakra-ui/react";
import React from "react";

const EditBookButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)

    const onSaveEdit = (): void => {
        console.log("save book - send post request to spring backend")
        onClose()
    }

    return (
        <>
            <Button mt={3} mb={5} onClick={onOpen}>Update Book</Button>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input ref={initialRef} placeholder='Title' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Chapters</FormLabel>
                            <Input placeholder='Chapters' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Pages</FormLabel>
                            <Input placeholder='Pages' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Author</FormLabel>
                            <Input placeholder='Author' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Start Date of Reading</FormLabel>
                            <Input
                                placeholder="Select Date and Time"
                                size="md"
                                type="datetime-local" />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onSaveEdit}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditBookButton