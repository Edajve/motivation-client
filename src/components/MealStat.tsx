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
import getFoodStats from "../hooks/internalApiHooks/getFoodStats";

interface buttonOptions {
    Good: string,
    Bad: string
}

const MealStat = () => {
    const [hideButtons, setHideButtons] = useState<Boolean>(false)
    const [goodChoice, setFoodChoice] = useState<buttonOptions>()
    const [kdr, setKdr] = useState<Number>()

    useEffect(() => {
        getFoodStats()
            .then(response => {
                var kdrPercentage = findKDR(response)
                setKdr(kdrPercentage)

            })
            .catch(err => { if (err) throw err })
    }, [])

    const findKDR = (response: any): Number => {
        var badCounter = 0
        var goodCounter = 0

        for (let i = 0; i < response.length; i++) {
            if (response[i].dailyStatus.toString() === 'good') goodCounter++
            else if (response[i].dailyStatus.toString() === 'bad') badCounter++
        }

        var kdPercentage = goodCounter / badCounter
        return kdPercentage
    }

    const onClickButton = (target: any): void => {
        // send the 'target' off to an api
    }

    const buttonStyles = {
        margin: "0rem 3rem",
        color: 'white'
    }

    const dynamicColorForKdr = (): string => {
        if (kdr !== undefined)
            return +kdr >= 1 ? 'green' : 'red'
        return 'green'
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
                            <StatLabel>Eating K/D for the year (Started Feb 4, 2024)</StatLabel>
                            <StatNumber color={dynamicColorForKdr()}>{String(kdr)}</StatNumber>
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