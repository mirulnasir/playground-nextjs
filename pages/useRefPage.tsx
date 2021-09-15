import { Container, Flex, VStack } from '@chakra-ui/layout'
import * as React from 'react'
import Timer from '../components/Timer'

const useRefPage = () => {

    return (
        <Container minH="100vh" as={Flex} alignItems="center" justifyContent="center">
            <VStack >
                <Timer />
            </VStack>
        </Container>
    )

}

export default useRefPage