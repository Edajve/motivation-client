import {
    Box,
    Spacer,
    Text,
    Divider
} from "@chakra-ui/react"
import EditBookButton from "./EditBookButton";
import SubmitBookReviewButton from "./SubmitBookReviewButton";
import { useEffect, useState } from "react";
import getReadOrUnreadBooks from "../hooks/internalApiHooks/getReadOrUnreadBooks";
import PickNextBook from "./PickNextBook";

const CurrentlyReading = () => {
    const [anyBooksInprogress, setAnyBooksInProgress] = useState<boolean>()

    useEffect(() => {
        getReadOrUnreadBooks(false)
            .then(res => {
                const isCurrentlyReadingBook = res.length === 0
                if (isCurrentlyReadingBook) {
                    setAnyBooksInProgress(false)
                    // do something that changes the ui
                }

            })
            .catch(err => { if (err) console.log(err) })
    }, [anyBooksInprogress])

    return (
        <>
            <Box w='80%' pt={2}>
                {anyBooksInprogress ?
                    (<>
                        <Text fontSize='2xl' fontWeight='bold'>Title</Text>
                        <Text fontSize='md'>How To Win Friends And Influence People</Text>
                        <Spacer h={4} />
                        <Text fontSize='xl' fontWeight='bold'>Chapters</Text>
                        <Text fontSize='md'>5 out of 28</Text>
                        <Spacer h={4} />
                        <Text fontSize='xl' fontWeight='bold'>Pages</Text>
                        <Text fontSize='md'>80 out of 159</Text>
                        <Spacer h={4} />
                        <Text fontSize='md'>By Dale Carnegie</Text>
                        <Spacer h={4} />
                        <Text fontSize='md'>Reading length: 00M:00W:00D</Text>
                        <Spacer h={4} />
                        <Divider />
                        <EditBookButton />
                        <SubmitBookReviewButton />
                    </>) : (
                        <PickNextBook />
                    )}
            </Box>
        </>
    )
}

export default CurrentlyReading;