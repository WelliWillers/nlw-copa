import { Box, Center, Text, Icon } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import Logo from '../../assets/logo.svg'
import { Fontisto } from '@expo/vector-icons'
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button';

export function SignIn() {

  const { signIn, isLoading } = useAuth()

  return (
    <Center flex={1} bgColor="gray.900" p="7">
      <Logo width={212} height={40} />
      <Button 
        type="secondary" 
        isLoading={isLoading} 
        onPress={signIn} 
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />} 
        mt="12" 
        title="Entrar com o google"
        _loading={{
          _spinner: {
            color: "white",
          }
        }}
      />
      <Text textAlign="center" mt="4" color="white">Não utilizamos nenhuma informação além{"\n"} do seu e-mail para criação de sua conta.</Text>
    </Center>
  );
}