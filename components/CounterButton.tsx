import { Button } from '@chakra-ui/button'
import * as React from 'react'
import { useState } from 'react'
import { useCountRenders } from '../hooks/useCountRenders'
interface IProps {
    incrementHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
}
// eslint-disable-next-line react/display-name
const CounterButton = React.memo(({ incrementHandler }: IProps) => {
    console.log('CBRENDER 💠')

    useCountRenders()
    console.log('CBRENDER 🔷')
    return (
        <Button onClick={incrementHandler}>Click to increment</Button>
    )
})

export default CounterButton