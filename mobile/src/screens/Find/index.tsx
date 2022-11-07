import { Heading, VStack } from "native-base";
import { Header } from "../../components/Header";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { toastBase } from "../../utils/toast";
import { api } from "../../services/api";

export function Find(){
    const { navigate } = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState('')

    async function handleJoinPool(){
        try {
            setIsLoading(true)
    
            if(!code.trim()){
                return toastBase('Código inválido ou não informado', 'success')
            }
    
            await api.post('/pools/join', { code })
            setIsLoading(false)
            toastBase('Você entrou no bolão com sucesso', 'success')
            navigate('pools')
        } catch (error) {
            console.error(error)
            setIsLoading(false)
            if(error.response?.data?.message) {
                return toastBase(error.response?.data?.message, 'error')
            }
            
            return toastBase('Não foi possível encontrar o bolão', 'error')
        }
    }


    return (
       <VStack flex={1} bgColor="gray.900">
            <Header title="Busque por código" showBackButton />

            <VStack mt="8" mx="5" alignItems="center">

                <Heading fontFamily="heading" color="white" fontSize="xl" mb="8" textAlign="center">
                    Encontre um bolão através{"\n"} de seu código único
                </Heading>

                <Input 
                    mb={2}
                    onChangeText={setCode}
                    value={code}
                    autoCapitalize="characters"
                    placeholder="Qual o código do bolão?"
                />

                <Button onPress={handleJoinPool} isLoading={isLoading} title="Buscar bolão" />
            </VStack>
       </VStack>
    );
}