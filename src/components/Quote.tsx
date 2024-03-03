import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import getQuote from '../hooks/getRandomQuotes';

function Quote() {
    const [quote, setQuote] = useState<string>();
    const [author, setAuthor] = useState<string>();
    const [category, setCategory] = useState<string>();

    useEffect(() => {
        getQuote()
            .then((res) => {
                setQuote(res[0].quote);
                setAuthor(res[0].author);
                setCategory(res[0].category);
            })
            .catch((error) => { throw error; });
    }, []);

    return (
        <Flex
            w="35rem"
            h='15rem'
            p={7}
            textAlign='center'
            flexDir='column'>
            <Box>
                <Text fontStyle='italic' fontSize='2rem' pb='1rem'>"{quote}"</Text>
            </Box>
            <Divider />
            <Box pt='1rem'>
                <Text>
                    {author}'s view on <Box as='span' fontWeight='bold'>{category}</Box>
                </Text>
            </Box>
        </Flex>
    );
}

export default Quote;
