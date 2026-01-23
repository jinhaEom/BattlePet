import React, { useRef } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import Typography from '../atoms/Typography';
import { useGameStore } from '@/store/useGameStore';
import { petImages, getStage } from '../atoms/PetCard';

const BattleChat = () => {
    const { myPet, reinforcePet, startBattle, sellPet, isLoading, roomCode, gold } = useGameStore();
    const flatListRef = useRef<FlatList>(null);
    
    const [messages, setMessages] = React.useState<any[]>([
        { id: '1', type: 'system', text: '전투 공간에 입장했습니다.' }
    ]);

    const handleReinforce = async () => {
        if (gold < 100) {
            setMessages(prev => [...prev, { id: Date.now().toString(), type: 'system', text: '❗ 골드가 부족합니다! (필요: 100G)' }]);
            return;
        }

        const prevPetName = myPet?.name;
        const success = await reinforcePet();
        const currentPet = useGameStore.getState().myPet;
        
        if (success && currentPet) {
            setMessages(prev => [...prev, { 
                id: Date.now().toString(), 
                type: 'success', 
                text: `✨ 강화 성공! Lv.${currentPet.level} ${currentPet.name}!!`,
                petType: currentPet.type,
                petLevel: currentPet.level
            }]);
        } else if (currentPet) {
            setMessages(prev => [...prev, { 
                id: Date.now().toString(), 
                type: 'fail', 
                text: `💀 강화 실패... ${prevPetName}이(가) 떠나고 새로운 ${currentPet.name}이 도착했습니다.`,
                petType: currentPet.type,
                petLevel: currentPet.level
            }]);
        }
    };

    const handleBattle = async () => {
        try {
            const { success, reward } = await startBattle();
            const currentPet = useGameStore.getState().myPet;

            setMessages(prev => [...prev, { 
                id: Date.now().toString(), 
                type: success ? 'battle_win' : 'battle_loss', 
                text: success ? `🏆 전투 승리! 보상으로 ${reward}G를 획득했습니다!` : `❌ 전투 패배... 다음 번엔 더 강해져서 돌아오세요.`,
                petType: currentPet?.type,
                petLevel: currentPet?.level
            }]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSell = async () => {
        if (!myPet) return;
        const sellPrice = Math.floor(myPet.price * (1 + (myPet.level - 1) * 0.1));
        const oldPetName = myPet.name;
        
        await sellPet();
        
        const newPet = useGameStore.getState().myPet;
        
        setMessages(prev => [...prev, 
            { 
                id: Date.now().toString() + '_sell', 
                type: 'system', 
                text: `💰 ${oldPetName}을(를) ${sellPrice}G에 판매했습니다.` 
            },
            {
                id: Date.now().toString() + '_new',
                type: 'system',
                text: `✨ 새로운 동료 ${newPet?.name}이(가) 도착했습니다!`
            }
        ]);
    };

    return (
        <View className="flex-1 bg-[#F9FAFB]">
            <View className="flex-1 px-4 pt-4">
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={item => item.id}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                    renderItem={({ item }) => {
                        const isSystem = item.type === 'system';
                        const petType = item.petType?.toUpperCase() || 'DEFAULT';
                        const stage = getStage(item.petLevel || 0);
                        const imageSource = (petImages[petType] || petImages['DEFAULT'])[stage];

                        return (
                            <View className={`mb-6 ${isSystem ? 'items-center' : 'items-start'}`}>
                                <View className={`p-4 rounded-2xl border ${
                                    isSystem ? 'bg-zinc-100 border-zinc-200 px-6' :
                                    item.type === 'success' || item.type === 'battle_win' ? 'bg-white border-blue-200 shadow-sm w-[85%]' :
                                    'bg-white border-red-100 shadow-sm w-[85%]'
                                }`}>
                                    {!isSystem && (
                                        <View className="flex-row items-center mb-2">
                                            <View className={`w-2 h-2 rounded-full mr-2 ${
                                                item.type.includes('success') || item.type.includes('win') ? 'bg-blue-500' : 'bg-red-400'
                                            }`} />
                                            <Typography variant="caption" bold color="zinc-500" uppercase tracking="widest">
                                                {item.type.replace('_', ' ').toUpperCase()}
                                            </Typography>
                                        </View>
                                    )}
                                    <Typography color={isSystem ? 'zinc-400' : 'zinc-800'} className={isSystem ? 'text-xs italic' : 'text-sm'}>
                                        {item.text}
                                    </Typography>

                                    {item.petType && (
                                        <View className="mt-4 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100">
                                            <Image source={imageSource} className="w-full h-40" resizeMode="cover" />
                                            <View className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded">
                                                <Typography variant="caption" color="white" bold>Lv.{item.petLevel} {item.petType}</Typography>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </View>
                        );
                    }}
                />
            </View>

            {/* Flat Controls */}
            <View className="p-6 bg-white border-t border-zinc-100">
                <View className="flex-row items-center gap-2 mb-3">
                    <TouchableOpacity 
                        onPress={handleReinforce}
                        disabled={isLoading || !myPet}
                        className={`flex-1 flex-row justify-center items-center h-12 rounded-lg border ${isLoading || !myPet ? 'bg-zinc-50 border-zinc-100' : 'bg-white border-blue-500 active:bg-blue-50'}`}
                    >
                        <Typography color={isLoading || !myPet ? 'zinc-400' : 'indigo-500'} bold variant="label">
                            {isLoading ? '강화 중...' : '강화 (100G)'}
                        </Typography>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={handleSell}
                        disabled={isLoading || !myPet || (myPet && myPet.level <= 1)}
                        className={`flex-1 flex-row justify-center items-center h-12 rounded-lg border ${isLoading || !myPet || (myPet && myPet.level <= 1) ? 'bg-zinc-50 border-zinc-100' : 'bg-white border-red-400 active:bg-red-50'}`}
                    >
                        <Typography color={isLoading || !myPet || (myPet && myPet.level <= 1) ? 'zinc-400' : 'red-500'} bold variant="label">
                            {myPet && myPet.level <= 1 ? '0강 판매 불가' : '판매'}
                        </Typography>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    onPress={handleBattle}
                    disabled={isLoading || !myPet}
                    className={`w-full flex-row justify-center items-center h-14 rounded-lg ${isLoading || !myPet ? 'bg-zinc-100' : 'bg-zinc-900 active:bg-black shadow-lg shadow-zinc-200'}`}
                >
                    <Typography color="white" bold>
                        {isLoading ? '전투 중...' : '전투 시작 (BATTLE)'}
                    </Typography>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BattleChat;
