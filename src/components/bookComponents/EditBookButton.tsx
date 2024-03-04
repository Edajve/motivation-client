import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter
} from "@chakra-ui/react";
import React, { useState } from "react";
import editBookUsingUpdateForm from "../../hooks/internalApiHooks/books/editBookUsingUpdateForm";

export interface EditPayload {
    title: string
    chapters: string
    pages: string
    author: string
    startReadingDate: string
}

const EditBookButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editPayloadBody, setEditPayloadBody] = useState<EditPayload>(
        {
            title: "",
            chapters: "",
            pages: "",
            author: "",
            startReadingDate: ""
        }
    )

    const initialRef = React.useRef(null)

    const onChangeEditBookInput = (input: any): void => {
        let inputText;
        let fieldToUpdate;

        switch (input.target.id) {
            case 'title-input':
                fieldToUpdate = 'title';
                break;
            case 'chapters-input':
                fieldToUpdate = 'chapters';
                break;
            case 'pages-input':
                fieldToUpdate = 'pages';
                break;
            case 'author-input':
                fieldToUpdate = 'author';
                break;
            case 'start-dateinput':
                fieldToUpdate = 'startReadingDate';
                break;
            default:
                return;
        }

        inputText = input.target.value;
        const newUpdateBook = { ...editPayloadBody, [fieldToUpdate]: inputText };
        setEditPayloadBody(newUpdateBook);
    };

    /**
     * TODO the 'editBookUsingUpdateForm' needs an id as the first parameter
     * you have to get that by taking data from the parent prop 'CurrentBook'
     * 
     */
    const OnUpdateBookById = (): void => {
        let updateForm = editPayloadBody
        editBookUsingUpdateForm(0, updateForm)
            .then(res => { return console.log('book updated successfully') })
            .catch(err => { console.error(err) });

        onClose()
    }

    return (
        <>
            <Button mt={6} mb={6} onClick={onOpen}>Update Book</Button>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Your Current Book</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input ref={initialRef} placeholder='Title'
                                id="title-input"
                                value={editPayloadBody.title}
                                onChange={target => onChangeEditBookInput(target)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Chapters</FormLabel>
                            <Input placeholder='Chapters'
                                id="chapters-input"
                                value={editPayloadBody.chapters}
                                onChange={target => onChangeEditBookInput(target)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Pages</FormLabel>
                            <Input placeholder='Pages'
                                id="pages-input"
                                value={editPayloadBody.pages}
                                onChange={target => onChangeEditBookInput(target)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Author</FormLabel>
                            <Input placeholder='Author'
                                id="author-input"
                                value={editPayloadBody.author}
                                onChange={target => onChangeEditBookInput(target)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Start Date of Reading</FormLabel>
                            <Input
                                placeholder="Select Date and Time"
                                size="md"
                                type="datetime-local"
                                id="start-dateinput"
                                value={editPayloadBody.startReadingDate}
                                onChange={target => onChangeEditBookInput(target)} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={OnUpdateBookById}>Save</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditBookButton