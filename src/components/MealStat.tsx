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
import createFoodStat, { createFoodStatPaylod } from "../hooks/internalApiHooks/createFoodStat";
import { getCurrentDateTimeString } from "../helpers/dateFormat";

interface GoodBad {
    good: string,
    bad: string
}

const MealStat = () => {
    const [kdr, setKdr] = useState<Number>()
    const [toggle, setToggle] = useState<boolean>(false)
    const [goodBad, setGoodBad] = useState<GoodBad>({
        good: "",
        bad: ""
    })
    const [foodStatPayload, setFoodStatPayload] = useState<createFoodStatPaylod>({
        dailyStatus: "",
        dateSubmitted: getCurrentDateTimeString()
    })

    useEffect(() => {
        getFoodStats()
            .then(response => {
                findKDR(response)
                var kd = parseInt(goodBad.good) / parseInt(goodBad.bad)
                // setKdr(kd)
            })
            .catch(err => { if (err) throw err })
    }, [toggle, foodStatPayload])

    const findKDR = (response: any): void => {
        let badCounter = 0
        let goodCounter = 0

        for (let i = 0; i < response.length; i++) {
            if (response[i].dailyStatus.toString() === 'good') goodCounter += 1
            else if (response[i].dailyStatus.toString() === 'bad') badCounter += 1
        }
        var x = parseInt(goodBad.good) / parseInt(goodBad.bad)

        let newGoodBad = { ...goodBad, good: goodCounter.toString(), bad: badCounter.toString() }
        setKdr(x)
        setGoodBad(newGoodBad)
    }

    const onClickGoodOrBadButton = (target: any): void => {
        var payloadValue;
        if (target.target.id === 'good-btn') payloadValue = 'good'
        else payloadValue = 'bad'
        var newPayload = { ...foodStatPayload, dailyStatus: payloadValue }
        setFoodStatPayload(newPayload)
        createFoodStat(newPayload)
        setToggle(!toggle)
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

    const dynamicIconForKdr = (): string => {
        if (kdr !== undefined)
            return +kdr >= 1 ? 'increase' : 'decrease'
        return 'increase'
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
                        id="good-btn"
                        onClick={(target) => onClickGoodOrBadButton(target)}
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
                                <StatArrow type={dynamicIconForKdr()} />
                                {goodBad.good}-{goodBad.bad}
                            </StatHelpText>
                        </Stat>
                    </StatGroup>
                </Box>
                <Box>
                    <Button
                        id="bad-btn"
                        onClick={(target) => onClickGoodOrBadButton(target)}
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
