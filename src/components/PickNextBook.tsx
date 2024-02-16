import {
    Box,
    Spacer,
    Text,
    Divider,
    Stack,
    VStack,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Heading,
    Flex
} from "@chakra-ui/react"
import EditBookButton from "./EditBookButton"
import { Image } from '@chakra-ui/react'
import SubmitBookReviewButton from "./SubmitBookReviewButton"

const PickNextBook = () => {

    const testTitle = 'Lorem ipsumojoj aodifa afoaufofidu jafldasfjio' // 15 characters for title
    const testDescription = 'Lorem ipsum dolor sit amet fjaid soifj aakajdjfiao aerpro nnlamofn ifoaepaeia iidfjaf ofjiafp isadjf isdhf iasdf nneito dfiaf dfiau' // description 101 characters

    const previewText = (text: String, maxCharacterLength: number, addEllipsis: boolean): string => {
        var shortenedText: string = text.substring(0, maxCharacterLength)
        if (addEllipsis) shortenedText += '...'
        return shortenedText
    }

    return (
        <>
            <div style={{
                width: '100%',
                height: '25rem',
                overflowY: 'scroll'
            }}>
                <Flex
                    w='100%'
                    h='120px'
                    bg='rgba(249, 255, 255, 0.12)'
                    borderRadius={4}
                    mb={3}
                    flexDirection='row'
                    justifyContent='space-between'>
                    <Box
                        p={1}
                        w='8rem'>
                        <Text
                            pl={1}
                            pb={1}
                            fontSize='sm'>
                            {previewText(testTitle, 15, false)}
                        </Text>
                        <Text
                            pl={2}
                            pb={2}
                            fontSize='8px'>
                            {previewText(testDescription, 102, true)}
                        </Text>
                        <Box pl={1} fontSize='xs'>5 star rating</Box>
                    </Box>
                    <Box>
                        <Image p={1} boxSize='80px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
                    </Box>
                </Flex>
                <Button>Add Book</Button>
            </div>
        </>
    )
}

export default PickNextBook