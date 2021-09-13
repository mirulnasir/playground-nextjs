import { Box, Container, Flex, HStack, VStack } from '@chakra-ui/layout'
import { Button, FormControl, FormLabel, Heading, Input, Skeleton, useToast } from '@chakra-ui/react'
import EmailJs, { init } from 'emailjs-com'
import * as React from 'react'
import { BeatLoader } from 'react-spinners'
import { config } from '../data/config'
import useFetch from '../hooks/useFetch'
import { useForm } from '../hooks/useForm'
import useRandom from '../hooks/useRandom'

init("user_aQSGslSHhfCOoOaUTxWO9");
const { emailjs, catapi } = config
const useStatePage = () => {
    // const [email, setEmail] = useState("")
    const toast = useToast()
    const [number, reset] = useRandom()
    const { data, loading } = useFetch(`http://numbersapi.com/${number}/trivia`)
    const { data: catData, loading: catLoading } = useFetch('https://api.thecatapi.com/v1/images/search', { 'x-api-key': catapi })
    const [isSending, setIsSending] = React.useState(false)
    const [values, handleChange] = useForm({ email: '' })
    const handleClickSend = () => {
        const templateParams = {
            to_email: values.email,
            message: data,
            cat: JSON.parse(catData)[0].url
        }
        setIsSending(true)
        EmailJs.send(emailjs.service_id, emailjs.template_id, templateParams)
            .then(res => {

                toast({ title: 'Email sent', status: "success" })


            }, err => {

                toast({
                    title: 'Email not sent', status: "error", description: JSON.stringify(err)
                })

            })

            .finally(() => setIsSending(false))
    }
    return (
        <>
            <Container maxW="3xl" minH="100vh" display="flex" justifyContent="center" alignItems="center">
                <VStack p="12" bg="gray.100" w="3xl" maxW="full" rounded="md" boxShadow="xl">
                    <Heading mb="4">
                        useState
                    </Heading>
                    <Box>

                        <VStack>
                            <FormControl id="email" as={Flex} alignItems="center">
                                <FormLabel mb="0">Email:</FormLabel>
                                <Input bg="white" type="email" name="email" value={values.email} onChange={handleChange} />
                            </FormControl>

                        </VStack>


                    </Box>
                    <Box>
                        {catLoading ? '' :
                            (
                                <img src={JSON.parse(catData)[0].url} />
                            )}
                    </Box>
                    <Box mt="24px!important">
                        {loading ? <Skeleton height="20px" />
                            : data}
                    </Box>
                    <HStack>

                        <Button isLoading={loading} colorScheme="teal" spinner={<BeatLoader size={8} color="white" />} onClick={reset} variant="solid">Reset</Button>
                        {loading ? <Skeleton height="20px" />
                            : <Button isDisabled={values.email.length <= 0} isLoading={isSending} spinner={<BeatLoader size={8} color="white" />} colorScheme="cyan" onClick={() => handleClickSend()}>Send</Button>}
                    </HStack>
                    <Box>

                    </Box>
                </VStack>
            </Container>
        </>
    )
}

export default useStatePage