import { FlatList, Heading, Icon, Toast, VStack } from "native-base";
import { Header } from "../../components/Header";
import { Octicons } from '@expo/vector-icons'

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";
import { useCallback, useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { PoolCard, PoolPros } from "../../components/PoolCard";
import { EmptyPoolList } from "../../components/EmptyPoolList";
import { toastBase } from "../../utils/toast";

export function Pools(){

    const navigate = useNavigation()
    const [isLoading, setIsLoading] = useState(true)
    const [pools, setPools] = useState<PoolPros[]>([])

    async function fetchPools(){
        try {
            setIsLoading(true)

            const { data } = await api.get('/pools')

            console.log('pools:', data)
            setPools(data)

        } catch (error) {
            console.error(error)
            return toastBase('Não foi possível carregar os bolões', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect( 
        useCallback (() => {
            fetchPools()
        }, [])
    )

    return (
       <VStack flex={1} bgColor="gray.900">
            
            <Header title="Busque por código" />

            <VStack mt="6" mx="5" alignItems="center" borderBottomWidth={1} borderBottomColor="gray.600" pb="4" mb="6" >
                <Button 
                    leftIcon={<Icon as={Octicons} name="search" color="black" size="sm" />} 
                    title="Buscar bolão por código"
                    onPress={() => navigate.navigate('find')}
                />
            </VStack>

            {
                isLoading ? (
                    <Loading /> 
                ) : (
                    <FlatList
                        data={pools}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <PoolCard 
                                data={item} 
                                onPress={() => navigate.navigate('details', {id: item.id})}
                            />
                        )}
                        px={5}
                        showsVerticalScrollIndicator={false}
                        _contentContainerStyle={{
                            pb: 24
                        }}
                        ListEmptyComponent={EmptyPoolList}
                    />
                )
            }
       </VStack>
    );
}