import { Heading, Icon, VStack } from "native-base";
import { Header } from "../../components/Header";
import { Octicons } from '@expo/vector-icons'

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Pools(){
    return (
       <VStack flex={1} bgColor="gray.900">
            
            <Header title="Busque por código" showBackButton />

            <VStack mt="6" mx="5" alignItems="center" borderBottomWidth={1} borderBottomColor="gray.600" pb="4" mb="6" >
                <Button leftIcon={<Icon as={Octicons} name="search" color="black" size="sm" />} title="Buscar bolão por código" />
            </VStack>
       </VStack>
    );
}