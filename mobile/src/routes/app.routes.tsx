import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { PlusCircle, SoccerBall } from "phosphor-react-native"

import { useTheme } from "native-base"
import { Platform } from "react-native"

import { New } from "../screens/New"
import { Pools } from "../screens/Pools"
import { Find } from "../screens/Find"

const {Navigator, Screen} = createBottomTabNavigator()

export function AppRoutes(){

    const { colors, sizes } = useTheme()

    const size = sizes[6]

    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.yellow[500],
            tabBarInactiveTintColor: colors.gray[300],
            tabBarLabelPosition: "beside-icon",
            tabBarStyle: {
                position: "absolute",
                height: sizes[22],
                borderTopWidth: 0,
                backgroundColor: colors.gray[800]
            },
            tabBarItemStyle: {
                position: "relative",
                top: Platform.OS === 'android' ? -10 : 0
            }
        }}>

            <Screen 
                options={{
                    tabBarIcon: ({color}) => <PlusCircle color={color} size={size} />,
                    tabBarLabel: "Novo Bolão"
                }} 
                name="new" 
                component={New} 
            />

            <Screen 
                options={{
                    tabBarIcon: ({color}) => <SoccerBall color={color} size={size} />,
                    tabBarLabel: "Meus Bolões"
                }} 
                name="pools" 
                component={Pools} 
            />

            <Screen 
                options={{
                    tabBarButton: () => null
                }} 
                name="find" 
                component={Find} 
            />

        </Navigator>
    )
}