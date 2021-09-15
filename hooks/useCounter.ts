import * as React from 'react'
import { useState, useEffect, useRef } from 'react'



function countDown(callback: () => void) {
    let startTime: number = 0;

    const countTimer = (timestamp: number, duration: number) => {
        let _timestamp = timestamp || new Date().getTime()
        const runtime = _timestamp - startTime  // r = tx - t0
        const progress = runtime / duration  // p = r/dt

        if (runtime < duration) {
            window.requestAnimationFrame((__timestamp: number) => {
                countTimer(__timestamp, duration)
            })
        } else {
            if (callback) callback()
        }

    }
    window.requestAnimationFrame((__timestamp) => {
        startTime = __timestamp || new Date().getTime()
        const a = countTimer(__timestamp, 1000)

    })
}

const useCounter = () => {
    const [count, setCount] = useState<number>(0)
    const [isStart, setIsStart] = useState<boolean>(false)
    const countRef = useRef(count)

    // useEffect(() => {
    //     const timer = setTimeout(() => setCount(++countRef.current), 1000)
    //     return (() => clearTimeout(timer))
    // }, [count])

    useEffect(() => {
        if (isStart) {
            countDown(() => {

                setCount(++countRef.current)
            })
        }


    }, [count, isStart])

    useEffect(() => {
        console.log('COUNT', count)
    }, [count])

    return [
        count,
        () => setIsStart(true),
        () => setIsStart(false)
    ] as const

}

export default useCounter