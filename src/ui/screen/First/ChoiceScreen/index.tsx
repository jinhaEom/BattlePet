import React, { useEffect } from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withSpring, 
    withDelay, 
    withRepeat, 
    withSequence, 
    withTiming 
} from "react-native-reanimated";
import { useRootNavigation } from "@/ui/navigation";
import { useGameStore } from "@/store/useGameStore";
import Typography from "@/ui/components/atoms/Typography";
import Button from "@/ui/components/atoms/Button";

const ChoiceScreen = () => {
    const navigation = useRootNavigation();
    const { createRoom, isLoading } = useGameStore();

    const titleOpacity = useSharedValue(0);
    const titleTranslateY = useSharedValue(20);
    const contentOpacity = useSharedValue(0);
    const contentTranslateY = useSharedValue(20);
    const pulseScale = useSharedValue(1);

    useEffect(() => {
        titleOpacity.value = withTiming(1, { duration: 1000 });
        titleTranslateY.value = withSpring(0);
        
        contentOpacity.value = withDelay(500, withTiming(1, { duration: 1000 }));
        contentTranslateY.value = withDelay(500, withSpring(0));

        pulseScale.value = withRepeat(
            withSequence(
                withTiming(1.05, { duration: 2000 }),
                withTiming(1, { duration: 2000 })
            ),
            -1,
            true
        );
    }, []);

    const animatedTitleStyle = useAnimatedStyle(() => ({
        opacity: titleOpacity.value,
        transform: [{ translateY: titleTranslateY.value }],
    }));

    const animatedContentStyle = useAnimatedStyle(() => ({
        opacity: contentOpacity.value,
        transform: [{ translateY: contentTranslateY.value }],
    }));

    const animatedLogoStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulseScale.value }],
    }));

    const handleCreateRoom = async () => {
        const code = await createRoom();
        if (code) {
            navigation.navigate('MainScreen');
        }
    };

    const handleJoinRoom = () => {
        navigation.navigate('WriteScreen');
    };

    return (
        <SafeAreaView className="flex-1 bg-[#05050a]">
            <StatusBar barStyle="light-content" />
            
            <View className="flex-1 px-8 justify-between py-20">
                <Animated.View style={[animatedTitleStyle]} className="items-center mt-10">
                    <Animated.View style={animatedLogoStyle}>
                        <Typography variant="h1" black italic tracking="tighter" className="text-6xl">
                            BATTLE<Typography color="indigo-500">PET</Typography>
                        </Typography>
                    </Animated.View>

                    <View className="h-[1px] w-12 bg-indigo-500/50 mt-6" />
                    
                    <Typography variant="h3" color="zinc-400" className="text-center mt-10 leading-[30px]">
                        강력한 펫과 함께 하는{"\n"}
                        <Typography bold color="white">궁극의 배틀 필드</Typography>
                    </Typography>
                </Animated.View>

                <Animated.View style={animatedContentStyle} className="w-full">
                    <Button 
                        label="전장 참여"
                        onPress={handleCreateRoom}
                        isLoading={isLoading}
                        className="mb-4"
                    />
                    
                    <Button 
                        label="방코드 입력"
                        variant="secondary"
                        onPress={handleJoinRoom}
                    />
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

export default ChoiceScreen;