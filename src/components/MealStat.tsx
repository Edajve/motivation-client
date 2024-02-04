import { Box, Text, Flex, Button } from "@chakra-ui/react";
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
} from '@chakra-ui/react'
import { useEffect, useState } from "react";

interface buttonOptions {
    Good: string,
    Bad: string
}

const MealStat = () => {
    const [hideButtons, setHideButtons] = useState<Boolean>(false)
    const [goodChoice, setFoodChoice] = useState<buttonOptions>()

    useEffect(() => {
        // get call to the latest food choice, populate the stats with the response
    }, [])

    const onClickButton = (target: any): void => {
        // send the 'target' off to an api
    }

    const buttonStyles = {
        margin: "0rem 3rem",
        color: 'white'
    }

    return (
        <Flex
            pt='7rem'
            flexDirection='column'
            w='50%'
            h='45vh'
            alignItems='center'>
            <Text
                fontSize='3xl'
                pb='1rem'>
                How did you <span role="img" aria-label="fork-and-knife"> 🍴</span> today?
            </Text>
            <Flex>
                <Box>
                    <Button
                        onClick={(target) => onClickButton(target)}
                        {...buttonStyles}
                        colorScheme='teal'
                        variant='outline'>
                        Good
                    </Button>
                </Box>
                <Box>
                    <StatGroup>
                        <Stat>
                            <StatLabel>Eating K/D for the year</StatLabel>
                            <StatNumber color='green'>.06</StatNumber>
                            <StatHelpText>
                                <StatArrow type='increase' />
                                23.36%
                            </StatHelpText>
                        </Stat>
                    </StatGroup>
                </Box>
                <Box>
                    <Button
                        onClick={(target) => onClickButton(target)}
                        {...buttonStyles}
                        colorScheme='teal'
                        variant='outline'>
                        Bad
                    </Button>
                </Box>
            </Flex>
        </Flex>
    )
}

export default MealStat