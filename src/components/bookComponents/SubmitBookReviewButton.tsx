import {
    Button,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import React from "react";

const SubmitBookReviewButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)

    const onSaveEdit = (): void => {
        console.log("save book - send post request to spring backend")
        onClose()
    }

    return (
        <>
            <Button onClick={onOpen}>Submit Book Review</Button>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Submit Your Current Book</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl mt={3}>
                            <FormLabel>How was the book?</FormLabel>
                            <Input ref={initialRef} placeholder='Opinions?' />
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel>Any special notes?</FormLabel>
                            <Input ref={initialRef} placeholder='Notes?' />
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel>Out of 5 Stars</FormLabel>
                            <Input ref={initialRef} placeholder='Notes?' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onSaveEdit}> Save</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SubmitBookReviewButton