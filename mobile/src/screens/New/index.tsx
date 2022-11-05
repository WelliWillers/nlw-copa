import { Heading, Text, VStack } from "native-base";
import { Header } from "../../components/Header";

import Logo from '../../assets/logo.svg'
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function New(){
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
                    placeholder="Qual o nome do seu bolão?"
                />

                <Button title="Criar meu bolão" />

                <Text color="gray.200" fontSize="sm" textAlign="center" mt={4} px={10}>
                    Após criar seu bolão, você receberá um{"\n"} 
                    código único que poderá usar para convidar{"\n"} 
                    outras pessoas.
                </Text>
            </VStack>
       </VStack>
    );
}