import {
    Spacer,
    Text,
    Divider
} from "@chakra-ui/react"
import EditBookButton from './EditBookButton'
import SubmitBookReviewButton from './SubmitBookReviewButton'

const CurrentBook = () => {
    return (
        <>
            <Text fontSize='2xl' fontWeight='bold'>Title</Text>
            <Text fontSize='md'>How To Win Friends And Influence People</Text>
            <Spacer h={4} />
            <Text fontSize='xl' fontWeight='bold'>Chapters</Text>
            <Text fontSize='md'>5 out of 28</Text>
            <Spacer h={4} />
            <Text fontSize='xl' fontWeight='bold'>Pages</Text>
            <Text fontSize='md'>80 out of 159</Text>
            <Spacer h={4} />
            <Text fontSize='md'>By Dale Carnegie</Text>
            <Spacer h={4} />
            <Text fontSize='md'>Reading length: 00M:00W:00D</Text>
            <Spacer h={4} />
            <Divider />
            <EditBookButton />
            <SubmitBookReviewButton /></>
    )
}

export default CurrentBook