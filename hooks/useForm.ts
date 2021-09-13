import { useToast } from '@chakra-ui/toast'
import * as React from 'react'

interface INames {

}


export const useForm  = <T>(initialValues: T) => {
    const [values, setValues] = React.useState(initialValues)
    const [focus, setFocus] = React.useState({ name: '' })
    const toast = useToast()
    React.useEffect(() => {
        (focus.name !== '')
            && (
                toast(
                    {
                        title: `FOCUS: ${focus.name}`,
                        position: 'bottom-right'
                    }
                )
            )

    })
    return [
        values,
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setValues(
                {
                    ...values,
                    [e.target.name]: e.target.value
                }
            )
        },
        (e: React.MouseEvent<HTMLInputElement>) => {
            setFocus(
                { name: e.currentTarget.name }
            )
        }
    ] as const
}