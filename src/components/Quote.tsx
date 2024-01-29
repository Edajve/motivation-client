import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import getQuote from '../hooks/getRandomQuotes';

function Quote() {
    const [quote, setQuote] = useState<String>()
    const [author, setAuthor] = useState<String>()
    const [category, setCategory] = useState<String>()

    useEffect(() => {
        getQuote()
            .then((res) => {
                setQuote(res[0].quote)
                setAuthor(res[0].author)
                setCategory(res[0].category)
            })
            .catch((error) => { throw error });
    }, [])

    return (
        <Flex
            w="35rem"
            h='15rem'
            p={7}
            textAlign='center'
            flexDir='column'>
            <Box>
                <Text fontSize='2rem' pb='1rem'>"{quote}"</Text>
            </Box>
            <Divider />
            <Box>
                <Text pt='1rem'>{author}'s view on {category}</Text>
            </Box>
        </Flex>
    )
}

export default Quote;