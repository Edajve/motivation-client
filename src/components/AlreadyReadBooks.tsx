import { Box, StackDivider, VStack, Text } from "@chakra-ui/react";

const AlreadyReadBooks = () => {
    // call a get all api and map over the elements as jsx

    const boxStyles = {
        p: 2,
        h: '70px',
        overflow: 'auto',
    };

    const hoverStyles = {
        _hover: {
            backgroundColor: "rgb(222, 229, 255)",
            opacity: '0.2',
            color: 'black'
        }
    }
    // this needs to be mapped over when getting api response
    return (
        <>
            <VStack w='95%' h='100vh'
                divider={<StackDivider borderColor='gray.200' />}
                spacing={1}
                align='stretch'>
                <Box {...boxStyles} {...hoverStyles}>
                    <Text fontSize='sm'>Haruki Murakami</Text>
                    <Text ml={2} fontSize='11px'>Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam </Text>
                </Box>
                <Box {...boxStyles} {...hoverStyles}>
                    <Text fontSize='sm'>Haruki Murakami</Text>
                    <Text ml={2} fontSize='11px'>Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam </Text>
                </Box>
                <Box {...boxStyles} p={2} {...hoverStyles}>
                    <Text fontSize='sm'>Haruki Murakami</Text>
                    <Text ml={2} fontSize='11px'>Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam </Text>
                </Box>
            </VStack>
        </>
    )
}

export default AlreadyReadBooks 