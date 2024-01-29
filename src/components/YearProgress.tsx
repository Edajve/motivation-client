import { Box, Progress, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import yearJson from '../data/yearJson.json'

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

        if (previousMonthIndex <= firstMonthIndex) {
            totalCurrentDays = date.getDate()
        } else {
            yearJson.months.splice(firstMonthIndex, currentMonthIndex)
                .map(month => totalCurrentDays += month.maxDays)

            totalCurrentDays + date.getDate()
        }
        return totalCurrentDays
    }

    return (
        <Box id='YearProgress'
            mt='30px'
            w='30rem'>
            <Text>Till 2024</Text>
            <Progress
                value={parseInt(yearPercentage)}
                size='lg'
                colorScheme='green'
                rounded="md"
                backgroundColor="black"
            />
            <Text id='progress-percentage-test' fontSize='2rem'>{yearPercentage}%</Text>
        </Box>
    )
}

export default YearProgress