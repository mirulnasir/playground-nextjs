import * as React from 'react'
import { ISSERVER } from '../constants/constants'

export const useCountRenders = () => {
    const render = React.useRef(0)
    if (!ISSERVER) {
        console.log('USERENDER ❔', render)
        render.current++

        console.log('USERENDER VAL 🔶', render.current)
        console.log('USERENDER ❓', render)
    }



}
