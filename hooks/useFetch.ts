import * as React from 'react'

const useFetch = (url: string, headers = {}) => {
    const [state, setState] = React.useState({ data: '', loading: true })
    React.useEffect(() => {
        setState((prev) => ({ ...prev, loading: true }))
        fetch(url, {
            method: 'Get',
            headers: {
                ...headers,
                'Accept': 'application/json'
            }
        }).then(res => res.text()
        ).then(data =>
            setState({ data: data, loading: false }))
    }, [url,  setState])

    return state
}

export default useFetch