import React from 'react';
import { View, Image } from 'react-native';
import Typography from './Typography';
import Animated, { FadeIn } from 'react-native-reanimated';

// 펫 타입 및 레벨(진화 단계)별 이미지 매핑
export const petImages: { [key: string]: { [key: number]: any } } = {
    'DRAGON': {
        1: require('@/assets/pets/fire_1.png'),
        2: require('@/assets/pets/fire_2.png'),
        3: require('@/assets/pets/fire_3.png'),
        4: require('@/assets/pets/fire_4.png'),
    },
    'SLIME': {
        1: require('@/assets/pets/water_1.png'),
        2: require('@/assets/pets/water_2.png'),
        3: require('@/assets/pets/water_3.png'),
        4: require('@/assets/pets/water_4.png'),
    },
    'UNICORN': {
        1: require('@/assets/pets/electric_1.png'),
        2: require('@/assets/pets/electric_2.png'),
        3: require('@/assets/pets/electric_3.png'),
        4: require('@/assets/pets/electric_4.png'),
    },
    'BEAR': {
        1: require('@/assets/pets/grass_1.png'),
        2: require('@/assets/pets/grass_1.png'),
        3: require('@/assets/pets/grass_1.png'),
        4: require('@/assets/pets/grass_1.png'),
    },
    'DEFAULT': {
        1: require('@/assets/pets/fire_1.png'),
    }
};

export const getStage = (level: number) => {
    if (level >= 12) return 4;
    if (level >= 8) return 3;
    if (level >= 4) return 2;
    return 1;
};

interface PetCardProps {
    name: string;
    level: number;
    rarity: string;
    type: string;
    image?: string;
    isMine?: boolean;
}

const PetCard: React.FC<PetCardProps> = ({ name, level, rarity, type, isMine }) => {
    const isEpic = rarity?.toLowerCase() === 'epic';
    const petType = type?.toUpperCase() || 'DEFAULT';
    const stage = getStage(level);
    const imageSource = (petImages[petType] || petImages['DEFAULT'])[stage] || petImages['DEFAULT'][1];
    
    return (
        <Animated.View 
            entering={FadeIn.duration(800)}
            className={`p-5 rounded-3xl border overflow-hidden ${isMine ? 'border-indigo-500/50 bg-zinc-900/80' : 'border-zinc-800 bg-zinc-900/40'}`}
        >
            {/* Background Accent Gradient Effect (Simulated with View) */}
            <View className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${
                petType === 'FIRE' ? 'bg-orange-500' :
                petType === 'WATER' ? 'bg-cyan-500' :
                petType === 'ELECTRIC' ? 'bg-yellow-400' : 'bg-emerald-500'
            }`} />

            <View className="flex-row justify-between items-start mb-4 z-10">
                <View className="bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">
                    <Typography variant="caption" color="zinc-400" bold>LV.{level}</Typography>
                </View>
                <View className={`${isEpic ? 'bg-amber-500/20 border-amber-500/30' : 'bg-zinc-700/20 border-zinc-600/30'} px-3 py-1 rounded-full border`}>
                    <Typography variant="caption" color={isEpic ? 'amber-400' : 'zinc-500'} bold uppercase tracking="widest">
                        {rarity}
                    </Typography>
                </View>
            </View>

            {/* Pet Image Display Area */}
            <View className="items-center justify-center py-4 z-10">
                <View className="w-32 h-32 rounded-2xl overflow-hidden bg-zinc-800/50 border border-zinc-700/50">
                    <Image 
                        source={imageSource} 
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                    />
                </View>
            </View>

            <View className="z-10">
                <Typography variant="h2" black italic className="mb-1 text-2xl">
                    {name}
                </Typography>
                
                <View className="flex-row items-center">
                    <View className={`w-2 h-2 rounded-full mr-2 ${
                        petType === 'FIRE' ? 'bg-orange-500' :
                        petType === 'WATER' ? 'bg-cyan-500' :
                        petType === 'ELECTRIC' ? 'bg-yellow-400' : 'bg-emerald-500'
                    }`} />
                    <Typography variant="label" color="zinc-500" bold uppercase tracking="widest">
                        ELEMENT: <Typography color={
                             petType === 'FIRE' ? 'orange-400' :
                             petType === 'WATER' ? 'cyan-400' :
                             petType === 'ELECTRIC' ? 'yellow-400' : 'emerald-400'
                        }>{type}</Typography>
                    </Typography>
                </View>
            </View>

            {isMine && (
                <View className="mt-4 pt-4 border-t border-indigo-500/10 items-center z-10">
                    <Typography variant="caption" color="indigo-500" bold italic>MY ACTIVE PET</Typography>
                </View>
            )}
        </Animated.View>
    );
};

export default PetCard;
