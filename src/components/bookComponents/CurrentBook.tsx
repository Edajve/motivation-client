import {
    Spacer,
    Text,
    Divider
} from "@chakra-ui/react"
import EditBookButton from './EditBookButton'
import SubmitBookReviewButton from './SubmitBookReviewButton'
import { useEffect, useState } from "react"
import getReadOrUnreadBooks, { BookResponsePayload } from "../../hooks/internalApiHooks/books/getReadOrUnreadBooks"
import { calculateDurationOfBook } from "../../helpers/dateFormat"
import { getCurrentDateTimeString } from "../../hooks/internalApiHooks/createNote"

const CurrentBook = () => {
    const [bookInReading, setBookInReading] = useState<BookResponsePayload>()

    useEffect(() => {
        getReadOrUnreadBooks(true)
            .then(res => {
                const bookBeingRead = res[0]
                setBookInReading(bookBeingRead)
            })
            .catch(err => { if (err) console.log(err) })
    }, [])
    const calculateReadingDuration = (): string => {
        return calculateDurationOfBook(bookInReading?.startReadingDate, getCurrentDateTimeString());
    }

    return (
        <>
            <Text fontSize='2xl' fontWeight='bold'>Title</Text>
            <Text fontSize='md'>{bookInReading?.title}</Text>
            <Spacer h={4} />
            <Text fontSize='xl' fontWeight='bold'>Chapters</Text>
            <Text fontSize='md'>{bookInReading?.currentChapter} out of {bookInReading?.totalChapters}</Text>
            <Spacer h={4} />
            <Text fontSize='xl' fontWeight='bold'>Pages</Text>
            <Text fontSize='md'>{bookInReading?.currentPage} out of {bookInReading?.totalPages}</Text>
            <Spacer h={4} />
            <Text fontSize='md'>By {bookInReading?.author.authorName}</Text>
            <Spacer h={4} />
            <Text fontSize='md'>Reading length: {calculateReadingDuration()}</Text>
            <Spacer h={4} />
            <Divider />
            <EditBookButton />
            <SubmitBookReviewButton /></>
    )
}

export default CurrentBook