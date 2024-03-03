import { Box, StackDivider, VStack, Text, Flex, Button } from "@chakra-ui/react";
import DeleteABookButton from "./DeleteABookButton";
import { useEffect, useState } from "react";
import getCompletedBooks from "../../hooks/internalApiHooks/books/getCompletedBooks";
import { BookRequestPayload } from "../../hooks/internalApiHooks/books/createBook";
import { BookResponsePayload } from "../../hooks/internalApiHooks/books/getReadOrUnreadBooks";
import deleteBookById from "../../hooks/internalApiHooks/books/deleteABookById";

const AlreadyReadBooks = () => {
    const [completedBooks, setCompletedBooks] = useState<BookRequestPayload[]>()
    const [bookId, setBookId] = useState<String>()
    const [deleteState, setDeleteState] = useState<string>('');

    useEffect(() => {
        getCompletedBooks()
            .then(res => {
                const books: BookResponsePayload[] = res as BookResponsePayload[];
                setCompletedBooks(books)
            })
            .catch(err => { throw err });
    }, [bookId])


    useEffect(() => {
        if (deleteState == "DELETE") {
            console.log('ready to delete id of :', bookId)
            // delete using api
            deleteBookById(bookId)
                .then(res => { setDeleteState("COMPLETED") })
                .catch(err => { console.error(err) });

            // set state to completed

        }
    }, [deleteState])

    const handleDataFromChild = (childData: string) => setDeleteState(childData)

    const boxStyles = {
        p: 2,
        h: 'auto',
        overflow: 'auto',
        borderRadius: '6px'
    }

    const hoverStyles = {
        _hover: {
            backgroundColor: "rgb(222, 229, 255)",
            opacity: '0.2',
            color: 'black'
        }
    }

    const cursorPointer = {
        cursor: 'pointer'
    }

    return (
        <>
            <VStack w='95%' h='100vh'
                divider={<StackDivider borderColor='gray.200' />}
                spacing={1}
                align='stretch'>
                {completedBooks?.map(book => [
                    <Flex justifyContent='space-between' {...boxStyles} {...hoverStyles}>
                        <Box className="bookInformationDiv">
                            <Text fontWeight='bold' fontSize='m'>{book.title}</Text>
                            <Text mb={3} ml={2} fontSize='sm'>By {book.author.authorName}</Text>
                            <Text fontSize='11px'>Completed Duration: 2 Days</Text>
                            <Text mt={1} ml={2} fontSize='11px'>Description: {book.description}</Text>
                        </Box>
                        <Box pt={4} className="deleteIcon" {...cursorPointer}>
                            <Button
                                onClick={() => setBookId(book?.id)}
                                backgroundColor='transparent'>
                                <DeleteABookButton sendDataToParent={handleDataFromChild} />
                            </Button>
                        </Box>
                    </Flex>
                ])}
            </VStack>
        </>
    )
}

export default AlreadyReadBooks 