import { Center, Flex, Square, Text, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import getCurrentWeather from "../hooks/getCurrentWeather";

type WeatherUpdate = {
    icon: string
    description: string
    location: string
    windSpeed: number
    farenheight: number,
    humidity: number
};

function Weather() {
    const [weather, setWeather] = useState<WeatherUpdate>()

    useEffect(() => {
        getCurrentWeather()
            .then((res) => {
                setWeather({
                    icon: res.current.condition.icon,
                    description: res.current.condition.text,
                    location: res.location.name,
                    windSpeed: res.current.wind_mph,
                    farenheight: res.current.feelslike_f,
                    humidity: res.current.humidity
                })
            })
            .catch((err) => { if (err) throw err })
    }, [])

    return (
        <Flex pt={4} color='white'>
            <Center w='100px' width={40}>
                <Text>Icon</Text>
            </Center>
            <Square size='150px'>
                <Text fontSize="xxx-large">{weather?.farenheight}˚</Text>
            </Square>
            <Flex flex='1' flexDir='row' justifyContent='space-between'>
                <Box pl={2} >
                    <Text fontWeight="bold" >Description</Text>
                     <Text>{weather?.description}</Text>
                </Box>
                <Box>
                    <Text fontWeight="bold" >Location</Text>
                    <Text>{weather?.location}</Text>
                </Box>
                <Box>
                    <Text fontWeight="bold" >Humidity</Text>
                    <Text>{weather?.humidity}</Text>
                </Box>
                <Box pr={2}>
                    <Text fontWeight="bold" >Wind Speed</Text>
                    <Text>{weather?.windSpeed}</Text>
                </Box>
            </Flex>
        </Flex>
    )
}

export default Weather;