import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackParamList } from "./type"
import ChoiceScreen from '@/ui/screen/First/ChoiceScreen'
import WriteScreen from '@/ui/screen/First/WriteScreen'
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export const useRootNavigation = <
  RouteName extends keyof RootStackParamList,
>() => useNavigation<NativeStackNavigationProp<RootStackParamList, RouteName>>();

export const useRootRoute = <RouteName extends keyof RootStackParamList>() =>
  useRoute<RouteProp<RootStackParamList, RouteName>>();