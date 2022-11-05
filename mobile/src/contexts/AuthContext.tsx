import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
// import * as AppleAuthentication from 'expo-apple-authentication';

interface Props {
    children: ReactNode
}

interface AuthContextData {
    signIn(): Promise<void>
    signOut(): Promise<void>
    user: UserProps
    isLoading: boolean
}

interface UserProps {
    id: string
    name: string
    email: string
    photo?: string
}

interface AuthorizationResponse {
    params: {
        access_token: string
    }
    type: string
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: Props){

    const [ user, setUser ] = useState({} as UserProps)
    const [ isLoading, setIsLoading ] = useState(true)

    async function signOut(){
        // setUser({} as UserProps)
        // await AsyncStorage.removeItem(userStorageKey)
    }

    const [ request, response, promptAsync ] = Google.useAuthRequest({
        clientId: '874540415164-plp1g25sukgc83dcik2f9icdnfg83opo.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
        scopes: ['profile', 'email']
    })

    async function signIn(){
        try {
            setIsLoading(true)
            await promptAsync();
        } catch (err: any) {
            throw new Error(err)
        } finally {
            setIsLoading(false)
        }
    }
     
    async function signInWithApple(){
        // try {
        //     const credential = await AppleAuthentication.signInAsync({
        //         requestedScopes: [
        //             AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        //             AppleAuthentication.AppleAuthenticationScope.EMAIL
        //         ]
        //     })

        //     if(credential){
        //         const userLogged = {
        //             id: credential.user,
        //             name: credential.fullName!.givenName!,
        //             email: credential.email!,
        //             photo: `https://ui.avatars.com/api/?name=${credential.fullName!.givenName!}&length=1`
        //         }
        //         setUser(userLogged)
        //         await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
        //     }
        // } catch (error:any) {
        //     throw new Error(error)
        // }
    }

    async function signInWithGoggle (access_token: string) {
        console.log('access_token', access_token)
    }

    useEffect(() => {
        if(response?.type === "success" && response.authentication?.accessToken) {
            signInWithGoggle(response?.authentication.accessToken)
        }
    }, [response])

    return (
        <AuthContext.Provider value={{ signIn, signOut, user, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}