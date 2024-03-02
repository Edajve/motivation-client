import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import getReadOrUnreadBooks from "../hooks/internalApiHooks/books/getReadOrUnreadBooks";
import PickNextBook from "./PickNextBook";
import CurrentBook from "./CurrentBook";

const CurrentlyReadingModel = () => {
    const [isCurrentlyReadingABook, setIsCurrentlyReadingABook] = useState<boolean>()

    useEffect(() => {
        getReadOrUnreadBooks(true)
            .then(res => {
                const isCurrentlyReadingABook = res.length === 1
                if (isCurrentlyReadingABook) setIsCurrentlyReadingABook(true)
                else setIsCurrentlyReadingABook(false)
            })
            .catch(err => { if (err) console.log(err) })
    }, [isCurrentlyReadingABook])

    return (<><Box w='80%' pt={2}>{isCurrentlyReadingABook ? (<CurrentBook />) : (<PickNextBook />)}</Box></>)
}

export default CurrentlyReadingModel;