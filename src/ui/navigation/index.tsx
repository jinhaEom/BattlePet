import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackParamList } from "./types"
import ChoiceScreen from '@/ui/screen/First/ChoiceScreen'
import WriteScreen from '@/ui/screen/First/WriteScreen'
import MainScreen from '@/ui/screen/Home/MainScreen'

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="ChoiceScreen"
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true
                }}
            >
                <Stack.Screen name="ChoiceScreen" component={ChoiceScreen}/>
                <Stack.Screen name="WriteScreen" component={WriteScreen}/>
                <Stack.Screen name="MainScreen" component={MainScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export * from './types';