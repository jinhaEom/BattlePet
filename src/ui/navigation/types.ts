import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    ChoiceScreen: undefined;
    WriteScreen: undefined;
    MainScreen: undefined;
};

export const useRootNavigation = <
    RouteName extends keyof RootStackParamList,
>() => useNavigation<NativeStackNavigationProp<RootStackParamList, RouteName>>();

export const useRootRoute = <RouteName extends keyof RootStackParamList>() =>
    useRoute<RouteProp<RootStackParamList, RouteName>>();
