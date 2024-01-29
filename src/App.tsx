import { Box, Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import './App.css';
import YearProgress from './components/YearProgress';

function App() {
  return (
    <>
      <Grid
        h='100vh'
        w='100vw'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}>
        <GridItem rowSpan={2} colSpan={1} bg='tomato' opacity={0.2} />
        <GridItem colSpan={2} bg='papayawhip' opacity={0.2} />
        <GridItem colSpan={2} bg='papayawhip' opacity={0.2} />
        <GridItem colSpan={4}>
          <Flex
            id='yearProgressBox'
            w="40rem"
            h='10rem'
            justifyContent="space-between"
            p={4}>
            <YearProgress />
            <Box w='6rem' >
              <Button top='30%' colorScheme='white' variant='outline'> Add Note </Button>
            </Box>
          </Flex>
        </GridItem >
      </Grid>
    </>
  )
}

export default App;