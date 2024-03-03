import { Box, GridItem } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import CurrentlyReadingModel from "./CurrentlyReadingModel";
import AlreadyReadBooks from "./AlreadyReadBooks";

const BookTracker = () => {
    return (
        <GridItem
            rowSpan={2}
            colSpan={1}
            pt={5}
            pl={2}
            pr={2}>
            <Box
                w='100%'
                h='100%'
                borderRadius={6}>
                <Tabs >
                    <TabList>
                        <Tab>Reading</Tab>
                        <Tab>Read</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <CurrentlyReadingModel />
                        </TabPanel>
                        <TabPanel>
                            <AlreadyReadBooks />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </GridItem>
    )
}

export default BookTracker