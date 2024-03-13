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
import React, { useState } from "react";
import submitABookByID from "../../hooks/internalApiHooks/books/submitABookByID";
import getReadOrUnreadBooks from "../../hooks/internalApiHooks/books/getReadOrUnreadBooks";

export interface SubmitBookForm {
    bookOpinion: string
    specialNotes: string
    rating: number
    submissionDate: string
}

const SubmitBookReviewButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [submitForm, setSubmitForm] = useState<SubmitBookForm>({
        bookOpinion: "",
        specialNotes: "",
        rating: 0,
        submissionDate: "9999-12-31T01:09:24Z" // Adjusted to ISO-8601 format
    });
    const initialRef = React.useRef(null)

    const onChangeBookFormInputs = (input: any): void => {
        let inputText;
        let fieldToUpdate: any;

        switch (input.target.id) {
            case 'edit-opinions-form':
                fieldToUpdate = 'bookOpinion'
                break;
            case 'edit-special-notes-form':
                fieldToUpdate = 'specialNotes'
                break;
            case 'edit-rating-form':
                fieldToUpdate = 'rating'
                break;
            default:
                return
        }

        inputText = input.target.value
        const newSubmitObject = { ...submitForm, [fieldToUpdate]: inputText }
        setSubmitForm(newSubmitObject)
    }

    const onSaveEdit = async (): Promise<void> => {
        try {
            const booksResult = await getReadOrUnreadBooks(true);
            const bookId = booksResult[0].id;

            const submitResult = await submitABookByID(bookId, submitForm);
            console.log(submitResult);
        } catch (err) {
            console.error(err);
        }

        onClose();
    };

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
                            <Input
                                id="edit-opinions-form"
                                value={submitForm.bookOpinion}
                                onChange={target => onChangeBookFormInputs(target)}
                                ref={initialRef}
                                placeholder='Opinions?'
                            />
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel>Any special notes?</FormLabel>
                            <Input
                                id="edit-special-notes-form"
                                value={submitForm.specialNotes}
                                onChange={target => onChangeBookFormInputs(target)}
                                ref={initialRef}
                                placeholder='Notes?'
                            />
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel>Out of 5 Stars</FormLabel>
                            <Input
                                id="edit-rating-form"
                                value={submitForm.rating}
                                onChange={target => onChangeBookFormInputs(target)}
                                type="number"
                                ref={initialRef}
                                placeholder='Rating' />
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
