import { Box, GridItem } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import CurrentlyReading from "./CurrentlyReading";

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
                            <CurrentlyReading />
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </GridItem>
    )
}

export default BookTracker