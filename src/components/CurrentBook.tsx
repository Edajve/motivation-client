import {
    Spacer,
    Text,
    Divider
} from "@chakra-ui/react"
import EditBookButton from './EditBookButton'
import SubmitBookReviewButton from './SubmitBookReviewButton'
import { useEffect, useState } from "react"
import getReadOrUnreadBooks, { BookResponsePayload } from "../hooks/internalApiHooks/getReadOrUnreadBooks"
import getCurrentDateTimeString from "../helpers/dateFormat"

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
    
    /**
     * 
     * @param submissionDate when the book was added
     * @param currentData todays date
     * @returns This function first checks if the submission date is valid.
     * Then it calculates the time difference in milliseconds between the
     * current date and the submission date. After that, it converts the
     * milliseconds into days, hours, minutes, and seconds.
     * Finally, it formats these values into a human-readable
     * string representing the duration of time.
     */
    const calculateDurationOfBook = (submissionDate: string | undefined, currentData: string): string => {
        if (!submissionDate) {
            return "Invalid submission date";
        }
    
        const startDate = new Date(submissionDate);
        const currentDate = new Date(currentData);
    
        const durationMs = currentDate.getTime() - startDate.getTime();
    
        // Convert milliseconds to days, hours, minutes, seconds
        const millisecondsPerSecond = 1000;
        const millisecondsPerMinute = 60 * millisecondsPerSecond;
        const millisecondsPerHour = 60 * millisecondsPerMinute;
        const millisecondsPerDay = 24 * millisecondsPerHour;
    
        const days = Math.floor(durationMs / millisecondsPerDay);
        const hours = Math.floor((durationMs % millisecondsPerDay) / millisecondsPerHour);
        const minutes = Math.floor((durationMs % millisecondsPerHour) / millisecondsPerMinute);
        const seconds = Math.floor((durationMs % millisecondsPerMinute) / millisecondsPerSecond);
    
        // Format the duration
        let durationString = "";
        if (days > 0) {
            durationString += `${days} day${days > 1 ? 's' : ''}, `;
        }
        if (hours > 0) {
            durationString += `${hours} hour${hours > 1 ? 's' : ''}, `;
        }
        if (minutes > 0) {
            durationString += `${minutes} minute${minutes > 1 ? 's' : ''}, `;
        }
        if (seconds > 0) {
            durationString += `${seconds} second${seconds > 1 ? 's' : ''}`;
        }
    
        // Remove trailing comma and space
        durationString = durationString.replace(/, $/, '');
    
        return durationString || "Less than a second";
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