import { Box, Container, Flex } from '@chakra-ui/layout'
import * as React from 'react'
import CounterButton from '../components/CounterButton'

const useCallbackPage = () => {

    const [count, setCount] = React.useState<number>(0)

    return (
        <Container as={Flex} justifyContent="center" alignItems="center">
            <Box bg="gray.200">
                <CounterButton incrementHandler={() => setCount(count + 1)}></CounterButton>
            </Box>

        </Container>
    )
}
export default useCallbackPage