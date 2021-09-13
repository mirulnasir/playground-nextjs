import * as React from 'react'

const ISSERVER = typeof window === "undefined";

const useRandom = (numberOfDigits = 2) => {
    const [localNumber, setLocalNumber] = React.useState(() => {
        return !ISSERVER ? (JSON.parse(localStorage.getItem('randomNumber') as string) || 0) : 'ISSERVER'
    })

    React.useEffect(() => {
        !ISSERVER ? ((localStorage.setItem('randomNumber', JSON.stringify(localNumber)))) : 'ISSERVER'
    }, [localNumber])
    return [
        localNumber,
        () => {
            const newRandom = Math.random().toString().slice(2, numberOfDigits + 2)
            setLocalNumber(newRandom)

        }
    ]
}

export default useRandom