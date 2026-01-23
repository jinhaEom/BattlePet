import React, { useState } from "react";
import { 
    TextInput, 
    View, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Platform,
} from "react-native";
import { useRootNavigation } from "@/ui/navigation";
import { useGameStore } from "@/store/useGameStore";
import Typography from "@/ui/components/atoms/Typography";
import Button from "@/ui/components/atoms/Button";

const WriteScreen = () => {
    const navigation = useRootNavigation();
    const { joinRoom, isLoading } = useGameStore();
    const [roomCode, setRoomCode] = useState("");

    const handleJoin = async () => {
        if (roomCode.length === 6) {
            const success = await joinRoom(roomCode.toUpperCase());
            if (success) {
                navigation.navigate('MainScreen');
            }
        }
    }

    const goBack = () => navigation.goBack();

    return (
        <View>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <View className="flex-1 px-8 pt-10">
                    <TouchableOpacity onPress={goBack} className="mb-10">
                        <Typography color="zinc-500" bold>← BACK</Typography>
                    </TouchableOpacity>

                    <View className="mb-12">
                        <Typography variant="label" color="indigo-500" bold tracking="widest" className="mb-2">
                            JOIN BATTLE
                        </Typography>
                        <Typography variant="h1" black italic>전투 코드 입력</Typography>
                        <Typography color="zinc-500" className="mt-2">
                            참여하려는 방의 초대 코드를 입력해 주세요. (6자리)
                        </Typography>
                    </View>

                    <View className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-8">
                        <TextInput
                            value={roomCode}
                            onChangeText={(text) => setRoomCode(text.toUpperCase())}
                            placeholder="CODE"
                            placeholderTextColor="#27272a"
                            className="text-white text-4xl font-black text-center tracking-[12px]"
                            autoFocus
                            maxLength={6}
                            autoCapitalize="characters"
                        />
                    </View>

                    <Button 
                        label="전투 입장"
                        onPress={handleJoin}
                        isLoading={isLoading}
                        disabled={roomCode.length !== 6}
                    />

                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

export default WriteScreen;