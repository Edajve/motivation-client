import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import './App.css';
import YearProgress from './components/YearProgress';
import Quote from './components/Quote';
import Weather from './components/Weather';

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
        <GridItem fontStyle='italic' colSpan={2} opacity={1} p={5} pt='4rem'>
          <Quote />
        </GridItem>
        <GridItem colSpan={2}>
          <Weather />
        </GridItem>
        <GridItem colSpan={4}>
          <Flex
            id='yearProgressBox'
            w="40rem"
            h='15rem'
            justifyContent="space-between"
            p={4}>
            <Box w='6rem' >
              <YearProgress />
            </Box>
          </Flex>
        </GridItem >
      </Grid>
    </>
  )
}

export default App;