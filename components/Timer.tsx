import { Box, Button, CircularProgress, Editable, EditableInput, EditablePreview, HStack, Icon } from '@chakra-ui/react'
import * as React from 'react'
import useCounter from '../hooks/useCounter'
import { HiOutlinePlay, HiOutlinePause, HiRefresh } from 'react-icons/hi'
import ReactCanvasConfetti from 'react-canvas-confetti'
import { useRef, useState } from 'react'

const canvasStyles: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
}

let animationInstance: ((arg0: { origin: { y: number }; particleCount?: number; spread?: number; decay?: number; startVelocity?: number }) => any) | null = null

const makeShot = (particleRatio: number, opts: { spread?: number; decay?: number; scalar?: number; startVelocity?: number }) => {
    animationInstance && animationInstance({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(100 * particleRatio)
    })
}

const fire = () => {
    makeShot(0.25, {
        spread: 26,
        startVelocity: 55,
    })
    makeShot(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    })
    makeShot(0.2, {
        spread: 60
    })
    makeShot(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    })
}

const Timer = () => {

    const [count, startCount, stopCount] = useCounter()
    const inputRef = useRef(null)
    const [countTime, setCountTime] = useState<number>(25)
    const handleFire = () => {
        fire()
        console.log('cool')
    }
    console.log('PARENT INIT')


    const getInstance = (instance: ((arg0: { origin: { y: number }; particleCount?: number; spread?: number; decay?: number; startVelocity?: number }) => any) | null) => {
        animationInstance = instance
    }

    const handleClickStart = () => {

        startCount()
    }

    React.useEffect(() => {
        console.log('TRIGGER', count)
        if (countTime > 0) {
            setCountTime(25 - count)

        } else {
            console.log('STOPCOUNT', count)
            stopCount()
        }

    }, [count])
    return (
        <>
            <CircularProgress value={2} size="150px" thickness="15px"></CircularProgress>
            <Box>
                <Editable ref={inputRef} defaultValue="25" textAlign="center" value={countTime.toString()}>
                    <EditablePreview />
                    <EditableInput type="number" />
                </Editable>            </Box>
            <HStack>
                <Box>
                    <Button onClick={() => startCount()}>
                        <Icon as={HiOutlinePlay}></Icon>
                    </Button>
                </Box>
                <Box>
                    <Button onClick={() => stopCount()}>
                        <Icon as={HiOutlinePause}></Icon>
                    </Button>
                </Box>
                <Box>
                    <Button>
                        <Icon as={HiRefresh}></Icon>
                    </Button>
                </Box>
            </HStack>
            <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />

        </>
    )
}

export default Timer