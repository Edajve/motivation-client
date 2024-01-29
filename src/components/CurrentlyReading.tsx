import {
    Box,
    Spacer,
    Text,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from "@chakra-ui/react"

const CurrentlyReading = () => {
    return (
        <>
            <Box w='80%' pt={2}>
                <Text fontSize='2xl' fontWeight='bold'>Title</Text>
                <Text fontSize='md'>How to talk to people</Text>
                <Spacer h={4} />
                <Text fontSize='xl' fontWeight='bold'>Chapters</Text>
                <Text fontSize='md'>5 out of 28</Text>
                <Spacer h={4} />
                <Text fontSize='xl' fontWeight='bold'>Pages</Text>
                <Text fontSize='md'>80 out of 159</Text>
                <Spacer h={4} />

            </Box>
        </>
    )
}

export default CurrentlyReading;