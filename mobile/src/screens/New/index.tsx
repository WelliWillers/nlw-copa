import { Heading, Text, VStack, useToast } from "native-base";
import { Header } from "../../components/Header";

import Logo from '../../assets/logo.svg'
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useState } from "react";
import { Alert } from "react-native";
import { api } from "../../services/api";
import { toastBase } from "../../utils/toast";

export function New(){

    const toast = useToast()
    const [poolTitle, setPoolTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleNewPoolCreate(){
        if(!poolTitle.trim()){
            return toastBase('Informe o títlulo', 'warning')
        }

        try {
            setIsLoading(true)

            await api.post('/pools', {
                title: poolTitle
            })

            setPoolTitle('')

            return toastBase('Bolão criado com sucesso', 'success')

        } catch(e){
            console.error(e)
            return toastBase('Não foi possível criar o bolão', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    return (
       <VStack flex={1} bgColor="gray.900">
            <Header title="Criar novo Bolão" showBackButton={true} showShareButton />

            <VStack mt="8" mx="5" alignItems="center">
                <Logo />

                <Heading fontFamily="heading" color="white" fontSize="xl" my="8" textAlign="center">
                    Crie seu proprio bolão da copa{"\n"} e compartilhe com seus amigos!
                </Heading>

                <Input 
                    mb={2}
                    onChangeText={setPoolTitle}
                    value={poolTitle}
                    placeholder="Qual o nome do seu bolão?"
                />

                <Button title="Criar meu bolão" isLoading={isLoading} onPress={handleNewPoolCreate} />

                <Text color="gray.200" fontSize="sm" textAlign="center" mt={4} px={10}>
                    Após criar seu bolão, você receberá um{"\n"} 
                    código único que poderá usar para convidar{"\n"} 
                    outras pessoas.
                </Text>
            </VStack>
       </VStack>
    );
}