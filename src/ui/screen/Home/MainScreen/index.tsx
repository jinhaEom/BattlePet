import React, { useEffect } from 'react';
import { View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useGameStore } from '@/store/useGameStore';
import { useRootNavigation } from '@/ui/navigation';
import Typography from '@/ui/components/atoms/Typography';
import BattleChat from '@/ui/components/organisms/BattleChat';

const MainScreen = () => {
    const navigation = useRootNavigation();
    const { roomCode, myPet, gold, generateRandomPet, resetRoom } = useGameStore();

    useEffect(() => {
        if (!myPet) {
            generateRandomPet();
        }
    }, []);

    const handleExit = () => {
        resetRoom();
        navigation.navigate('ChoiceScreen');
    };

    return (
        <View className="flex-1 bg-white">
            <View className="px-6 py-4 flex-row justify-between items-center border-b border-zinc-100 bg-white">
                <View className="flex-row items-center">
                    <View className="bg-zinc-100 px-3 py-2 rounded-lg mr-4">
                        <Typography variant="caption" color="zinc-500" bold>ROOM: {roomCode || '------'}</Typography>
                    </View>
                    <View className="bg-amber-100 px-3 py-2 rounded-lg border border-amber-200">
                        <Typography variant="label" color="zinc-500" bold>💰 {gold.toLocaleString()}</Typography>
                    </View>
                </View>
                
                <TouchableOpacity 
                    onPress={handleExit}
                    className="bg-zinc-50 px-4 py-2 rounded-lg border border-zinc-200"
                >
                    <Typography variant="caption" color="zinc-500" bold>EXIT</Typography>
                </TouchableOpacity>
            </View>

            <BattleChat />
        </View>
    );
};

export default MainScreen;