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
    ModalOverlay,
    ButtonGroup
} from "@chakra-ui/react"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
} from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { useEffect, useState } from "react"
import React from "react"
import createBook from "../hooks/internalApiHooks/books/createBook";
import getReadOrUnreadBooks, { BookResponsePayload } from "../hooks/internalApiHooks/books/getReadOrUnreadBooks";
import readBookById from "../hooks/internalApiHooks/books/readABookById"

interface newBookForm {
    title: string;
    author: string;
    totalChapters: number;
    totalPages: number;

}

const PickNextBook = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [allUnreadBooks, setAllUnreadBooks] = useState<BookResponsePayload[]>([])
    const [chosenBookId, setChosenBookId] = useState<string | number>()
    const [newBook, setNewBook] = useState<newBookForm>(
        {
            title: "",
            author: "",
            totalChapters: 0,
            totalPages: 0
        }
    )

    useEffect(() => {
        getReadOrUnreadBooks(false)
            .then(res => {
                const books: BookResponsePayload[] = res as BookResponsePayload[];
                setAllUnreadBooks(books)

            })
            .catch(err => { if (err) console.log(err) })
    }, [])

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const previewText = (text: String, maxCharacterLength: number, addEllipsis: boolean): string => {
        if (text == "") return 'No Description...'

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

    const startReadingBook = () => {
        const bookId = chosenBookId
        readBookById(bookId)
            .then(res => { return res.data })
            .catch(err => { throw err });

        onClose()
    }

    return (
        <>
            <div style={{
                width: '100%',
                height: '25rem',
                overflowY: 'scroll'
            }}>
                {allUnreadBooks.map(book => [
                    <Popover
                        key={book.id}
                        placement='right'
                        closeOnBlur={false}>
                        <PopoverTrigger >
                            <Flex
                                w='100%'
                                h='120px'
                                bg='rgba(249, 255, 255, 0.12)'
                                borderRadius={4}
                                mb={3}
                                flexDirection='row'
                                justifyContent='space-between'
                                cursor='pointer'
                                onClick={() => setChosenBookId(book.id)}>
                                <Box
                                    p={1}
                                    w='8rem'>
                                    <Text
                                        pl={1}
                                        pb={1}
                                        fontSize='sm'>
                                        {previewText(book.title, 15, false)}
                                    </Text>
                                    <Text
                                        pl={2}
                                        pb={2}
                                        fontSize='8px'>
                                        {previewText(book.description, 102, true)}
                                    </Text>
                                    <Box pl={1} fontSize='xs'>5 star rating</Box>
                                </Box>
                                <Box>
                                    <Image p={1} boxSize='80px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
                                </Box>
                            </Flex>
                        </PopoverTrigger>

                        <PopoverContent color='black' bg='white' borderColor='white'>
                            <PopoverHeader pt={4} fontWeight='bold' border='0'>
                                {book.title}
                            </PopoverHeader>
                            <PopoverArrow bg='blue.800' />
                            <PopoverCloseButton />
                            <PopoverBody>
                                By: <Text fontWeight='bold'>{book.author.authorName}</Text>
                            </PopoverBody>
                            <PopoverBody>
                                {book.description}
                            </PopoverBody>
                            <PopoverBody>
                                Rating: <Text fontWeight='bold'>{book.rating}</Text> out of <Text fontWeight='bold'>5</Text>
                            </PopoverBody>
                            <PopoverFooter
                                border='0'
                                display='flex'
                                alignItems='center'
                                justifyContent='space-between'
                                pb={4}>
                                <ButtonGroup size='sm'>
                                    {/* find out how to click the 'Click to start reading this book' button and
                                    we can get the id of the specific book so that we can update that book */}
                                    <Button onClick={() => startReadingBook()} colorScheme='green'>Click to start reading this book</Button>
                                </ButtonGroup>
                            </PopoverFooter>
                        </PopoverContent>
                    </Popover>
                ])}
            </div>
            <Button onClick={onOpen}>Add a book to pending</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}>
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