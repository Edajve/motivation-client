import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import getReadOrUnreadBooks from "../hooks/internalApiHooks/getReadOrUnreadBooks";
import PickNextBook from "./PickNextBook";
import CurrentBook from "./CurrentBook";

const CurrentlyReadingModel = () => {
    const [currentlyReadingAnyBook, setCurrentlyReadingAnyBook] = useState<boolean>()

    useEffect(() => {
        getReadOrUnreadBooks(false)
            .then(res => {
                const isCurrentlyReadingABook = res.length === 0
                if (isCurrentlyReadingABook) {
                    // there is no book that is currently being read at the moment
                    setCurrentlyReadingAnyBook(false)
                } else {
                    // there is a book that is currently being read at the moment
                    setCurrentlyReadingAnyBook(true)
                }
            })
            .catch(err => { if (err) console.log(err) })
    }, [currentlyReadingAnyBook])

    return (<><Box w='80%' pt={2}>{currentlyReadingAnyBook ? (<CurrentBook />) : (<PickNextBook />)}</Box></>)
}

export default CurrentlyReadingModel;