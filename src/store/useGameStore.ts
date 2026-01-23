import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

interface Pet {
    id: string;
    name: string;
    level: number;
    rarity: string;
    type: string;
    price: number;
}

interface GameState {
    user: any | null;
    currentRoomId: string | null;
    roomCode: string | null;
    myPet: Pet | null;
    gold: number;
    isLoading: boolean;
    error: string | null;

    // Actions
    setUser: (user: any) => void;
    createRoom: () => Promise<string | null>;
    joinRoom: (code: string) => Promise<boolean>;
    generateRandomPet: () => Promise<void>;
    reinforcePet: () => Promise<boolean>;
    startBattle: () => Promise<{ success: boolean; reward: number }>;
    sellPet: () => Promise<void>;
    resetRoom: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    user: null,
    currentRoomId: null,
    roomCode: null,
    myPet: null,
    gold: 1000,
    isLoading: false,
    error: null,

    setUser: (user) => set({ user }),

    createRoom: async () => {
        set({ isLoading: true, error: null });
        try {
            const code = Math.random().toString(36).substring(2, 8).toUpperCase();

            set({ roomCode: code, currentRoomId: 'simulated-room-id' });
            return code;
        } catch (err: any) {
            set({ error: err.message });
            return null;
        } finally {
            set({ isLoading: false });
        }
    },

    joinRoom: async (code: string) => {
        set({ isLoading: true, error: null });
        try {
            // Simulation of room lookup
            if (code.length === 6) {
                set({ roomCode: code, currentRoomId: 'simulated-room-id' });
                return true;
            }
            throw new Error('올바르지 않은 코드입니다.');
        } catch (err: any) {
            set({ error: err.message });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    generateRandomPet: async () => {
        set({ isLoading: true });
        try {
            // Fetch templates from Supabase
            const { data: templates, error } = await supabase.from('pet_templates').select('*');

            if (error) throw error;
            if (templates && templates.length > 0) {
                const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
                set({
                    myPet: {
                        id: Math.random().toString(36).substring(7),
                        name: randomTemplate.pet_name,
                        level: 1,
                        rarity: randomTemplate.rarity,
                        type: randomTemplate.pet_type,
                        price: randomTemplate.price || 1000
                    }
                });
            }
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ isLoading: false });
        }
    },
    //펫 강화
    reinforcePet: async () => {
        const { myPet, gold } = get();
        if (!myPet || gold < 100) return false;

        set({ isLoading: true, gold: gold - 100 });

        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            const isSuccess = Math.random() < 0.2;
            if (isSuccess) {
                set({
                    myPet: { ...myPet, level: myPet.level + 1 }
                });
                return true;
            } else {
                const { data: templates } = await supabase.from('pet_templates').select('*');
                if (templates && templates.length > 0) {
                    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
                    set({
                        myPet: {
                            id: Math.random().toString(36).substring(7),
                            name: randomTemplate.pet_name,
                            level: 1,
                            rarity: randomTemplate.rarity,
                            type: randomTemplate.pet_type,
                            price: randomTemplate.price || 1000
                        }
                    });
                }
                return false;
            }
        } catch (err: any) {
            set({ error: err.message });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    startBattle: async () => {
        const { myPet, gold } = get();
        if (!myPet) throw new Error('펫이 없습니다.');

        set({ isLoading: true });
        try {
            const winRate = 0.5 + (myPet.level * 0.02);
            const isWin = Math.random() < winRate;
            const reward = isWin ? 500 : 0;

            if (isWin) {
                set({ gold: gold + reward });
            }
            return { success: isWin, reward };
        } finally {
            set({ isLoading: false });
        }
    },

    sellPet: async () => {
        const { myPet, gold } = get();
        // 0강일 때는 판매 불가
        if (!myPet || myPet.level <= 1) return;

        const sellPrice = Math.floor(myPet.price * (1 + (myPet.level - 1) * 0.1));

        // 판매 처리
        set({ gold: gold + sellPrice, myPet: null, isLoading: true });

        try {
            // 새로운 랜덤 펫 생성 
            const { data: templates } = await supabase.from('pet_templates').select('*');
            if (templates && templates.length > 0) {
                const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
                set({
                    myPet: {
                        id: Math.random().toString(36).substring(7),
                        name: randomTemplate.pet_name,
                        level: 1,
                        rarity: randomTemplate.rarity,
                        type: randomTemplate.pet_type,
                        price: randomTemplate.price || 1000
                    }
                });
            }
        } catch (err: any) {
            set({ error: err.message });
        } finally {
            set({ isLoading: false });
        }
    },

    resetRoom: () => set({ currentRoomId: null, roomCode: null, myPet: null })
}));
