import { Flex, Grid, GridItem } from '@chakra-ui/react';
import './App.css';
import YearProgress from './components/YearProgress';
import Quote from './components/Quote';
import Weather from './components/Weather';
import BookTracker from './components/BookTracker';
import MealStat from './components/MealStat';

function App() {
  return (
    <>
      <Grid
        h='100vh'
        w='100vw'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}>
        <BookTracker />
        <GridItem
          colSpan={2}
          opacity={1}
          p={5}
          pt='4rem'>
          <Quote />
        </GridItem>
        <GridItem colSpan={2}>
          <Weather />
        </GridItem>
        <GridItem colSpan={4}>
          <Flex flexDir='row'>
            <YearProgress />
            <MealStat />
          </Flex>
        </GridItem >
      </Grid>
    </>
  )
}

export default App;