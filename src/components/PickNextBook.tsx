import {
    Box,
    Text,
    Button,
    Flex,
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
} from "@chakra-ui/react"
import { Image } from '@chakra-ui/react'
import { useState } from "react"
import React from "react"
import createBook from "../hooks/internalApiHooks/createBook";

interface newBookForm {
    title: string;
    author: string;
    totalChapters: number;
    totalPages: number;

}

const PickNextBook = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newBook, setNewBook] = useState<newBookForm>(
        {
            title: "",
            author: "",
            totalChapters: 0,
            totalPages: 0
        }
    )

    const testTitle = 'Lorem ipsumojoj aodifa afoaufofidu jafldasfjio' // 15 characters for title
    const testDescription = 'Lorem ipsum dolor sit amet fjaid soifj aakajdjfiao aerpro nnlamofn ifoaepaeia iidfjaf ofjiafp isadjf isdhf iasdf nneito dfiaf dfiau' // description 101 characters

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)


    const previewText = (text: String, maxCharacterLength: number, addEllipsis: boolean): string => {
        var shortenedText: string = text.substring(0, maxCharacterLength)
        if (addEllipsis) shortenedText += '...'
        return shortenedText
    }

    const onAddBookToQueue = () => {
        createBook(newBook)
        .then(res => {
            return res
        })
        .catch(err => {
            if (err) {
                throw new err
            }
        })
    }

    const onChangeBookFormInputs = (input: any): void => {
        let inputText;
        let fieldToUpdate: any;

        switch (input.target.id) {
            case 'title-input':
                fieldToUpdate = 'title'
                break;
            case 'author-input':
                fieldToUpdate = 'author'
                break;
            case 'chapters-input':
                fieldToUpdate = 'totalChapters'
                break;
            case 'pages-input':
                fieldToUpdate = 'totalPages'
                break;
            default:
                return
        }

        inputText = input.target.value
        const newBookObject = { ...newBook, [fieldToUpdate]: inputText }
        setNewBook(newBookObject)
    }

    return (
        <>
            <div style={{
                width: '100%',
                height: '25rem',
                overflowY: 'scroll'
            }}>
                <Flex
                    w='100%'
                    h='120px'
                    bg='rgba(249, 255, 255, 0.12)'
                    borderRadius={4}
                    mb={3}
                    flexDirection='row'
                    justifyContent='space-between'>
                    <Box
                        p={1}
                        w='8rem'>
                        <Text
                            pl={1}
                            pb={1}
                            fontSize='sm'>
                            {previewText(testTitle, 15, false)}
                        </Text>
                        <Text
                            pl={2}
                            pb={2}
                            fontSize='8px'>
                            {previewText(testDescription, 102, true)}
                        </Text>
                        <Box pl={1} fontSize='xs'>5 star rating</Box>
                    </Box>
                    <Box>
                        <Image p={1} boxSize='80px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
                    </Box>
                </Flex>
                <Button onClick={onOpen}>Add a book to pending</Button>
            </div>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>A Book to Queue</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input
                                id="title-input"
                                value={newBook.title}
                                onChange={target => onChangeBookFormInputs(target)}
                                ref={initialRef}
                                placeholder='Book Title' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Author</FormLabel>
                            <Input
                                id="author-input"
                                value={newBook.author}
                                onChange={target => onChangeBookFormInputs(target)}
                                placeholder='Author Name' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Total Chapters</FormLabel>
                            <Input
                                id="chapters-input"
                                value={newBook.totalChapters}
                                onChange={target => onChangeBookFormInputs(target)}
                                type="number"
                                placeholder='Total # of Chapters' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Total Pages</FormLabel>
                            <Input
                                id="pages-input"
                                value={newBook.totalPages}
                                onChange={target => onChangeBookFormInputs(target)}
                                type="number"
                                placeholder='Total # of Pages' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => onAddBookToQueue()} colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PickNextBook