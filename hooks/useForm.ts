import { useToast } from '@chakra-ui/toast'
import * as React from 'react'

export const useForm = (initialValues) => {
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
        (e) => {
            setValues(
                {
                    ...values,
                    [e.target.name]: e.target.value
                }
            )
        },
        e => {
            setFocus(
                { name: e.currentTarget.name }
            )
        }
    ]
}