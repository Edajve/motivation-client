import { Center, Flex, Square, Text, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import weatherApi from "../services/weatherapi-client";

function Weather() {

    useEffect(() => {
    }, [])

    return (
        <Flex pt={4} color='white'>
            <Center w='100px' bg='green.500' width={40}>
                <Text>Icon</Text>
            </Center>
            <Square bg='blue.500' size='150px'>
                <Text>Farenheight</Text>
            </Square>
            <Flex flex='1' flexDir='row' bg='tomato' justifyContent='space-between'>
                <Box >
                    <Text>Descripton</Text>
                </Box>
                <Box>
                    <Text>Location</Text>
                </Box>
                <Box>
                    <Text>Humidity</Text>
                </Box>
                <Box pr={2}>
                    <Text>Windspeed</Text>
                </Box>
            </Flex>
        </Flex>
    )
}

export default Weather;