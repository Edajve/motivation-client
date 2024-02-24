import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import getReadOrUnreadBooks from "../hooks/internalApiHooks/getReadOrUnreadBooks";
import PickNextBook from "./PickNextBook";
import CurrentBook from "./CurrentBook";

const CurrentlyReadingModel = () => {
    const [anyBooksInprogress, setAnyBooksInProgress] = useState<boolean>()

    useEffect(() => {
        getReadOrUnreadBooks(false)
            .then(res => {
                const isCurrentlyReadingABook = res.length === 0
                if (isCurrentlyReadingABook) {
                    setAnyBooksInProgress(false) // this means that there is no book that is currently being read at the moment
                } else {
                    setAnyBooksInProgress(true) // there is a book that is currently being read
                }

            })
            .catch(err => { if (err) console.log(err) })
    }, [anyBooksInprogress])

    return (
        <>
            <Box w='80%' pt={2}>
                {anyBooksInprogress ?
                    (<CurrentBook />) : (<PickNextBook />)}
            </Box>
        </>
    )
}

export default CurrentlyReadingModel;