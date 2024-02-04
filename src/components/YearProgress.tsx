import {
    Box,
    Progress,
    Text,
    Flex
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import yearJson from '../data/yearJson.json'
import AddNote from './AddNoteButton'

function YearProgress() {
    const [yearPercentage, setYearPercentage] = useState(String)

    useEffect(() => {
        setYearPercentage(calculateYearlyPercent())
    }, [yearPercentage])

    const calculateYearlyPercent = (): string => {
        var totalDaysTillNow = getSumOfDaysTillToday()
        const DAYS_IN_A_YEAR = 366 // 2024 is a leap year
        var percentage = ((totalDaysTillNow / DAYS_IN_A_YEAR) * 100).toFixed(2)
        return percentage.toString()
    }

    const getSumOfDaysTillToday = (): number => {
        var date = new Date();
        var firstMonthIndex = 0
        var currentMonthIndex = date.getMonth()
        var previousMonthIndex = currentMonthIndex - 1
        var totalCurrentDays = 0
        var theCurrentMonthIsJanuaryOrFebuary = previousMonthIndex <= firstMonthIndex

        if (theCurrentMonthIsJanuaryOrFebuary) {
            totalCurrentDays = date.getDate() + 31 // 31 Days in January
        } else {
            yearJson.months.splice(firstMonthIndex, currentMonthIndex)
                .map(month => totalCurrentDays += month.maxDays)

            totalCurrentDays + date.getDate()
        }
        return totalCurrentDays
    }

    return (
        <Flex
            id='yearProgressBox'
            w="40rem"
            h='15rem'
            justifyContent="space-between"
            p={4}>
            <Box w='6rem' >
                <Box id='YearProgress'
                    mt='120px'
                    w='30rem'>
                    <Text>Till 2024</Text>
                    <Progress
                        value={parseInt(yearPercentage)}
                        size='lg'
                        colorScheme='green'
                        rounded="md"
                        backgroundColor="black" />
                    <Text id='progress-percentage-test' fontSize='2rem' pb={5}>{yearPercentage}%</Text>
                    <AddNote />
                </Box>
            </Box>
        </Flex>
    )
}

export default YearProgress