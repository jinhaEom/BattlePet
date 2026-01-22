import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';
import { supabase } from './lib/supabase';
import { SUPABASE_URL } from '@env';

// 1. 데이터 타입 정의 (TypeScript 사용 시 권장)
interface PetTemplate {
  id: string;
  pet_name: string;
  level: number;
  pet_type: string;
  rarity: string;
}

const TestFile = () => {
  // 2. 데이터를 담을 상태(State)와 로딩 상태 정의
  const [templates, setTemplates] = useState<PetTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 3. 데이터를 가져오는 함수
  const fetchPetTemplates = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      
      console.log('연결 시도 중...');
      const { data, error } = await supabase
        .from('pet_templates')
        .select('*')
        .order('pet_name', { ascending: true }); // level이 없을 수도 있으니 안전하게 pet_name으로 변경

      if (error) {
        console.error('Supabase Error:', error);
        throw error;
      }
      
      if (data) {
        console.log('수신 데이터:', data);
        setTemplates(data);
      }
    } catch (error: any) {
      const msg = error.message || '알 수 없는 에러 발생';
      setErrorMsg(msg);
      console.error('도감 로드 실패:', msg);
    } finally {
      setLoading(false);
    }
  };

  // 4. 컴포넌트가 마운트될 때 실행
  useEffect(() => {
    fetchPetTemplates();
  }, []);

  // 5. 로딩 중일 때 처리
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>데이터를 불러오는 중...</Text>
      </View>
    );
  }

  // 에러 발생 시 처리
  if (errorMsg) {
    return (
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>❌ 에러 발생</Text>
        <Text style={{ marginTop: 10, color: '#666' }}>{errorMsg}</Text>
        <View style={{ marginTop: 20, padding: 10, backgroundColor: '#eee' }}>
           <Text style={{ fontSize: 12 }}>디버깅 팁: 테이블 이름이 'pet_templates'가 맞는지, 혹은 RLS 정책이 설정되어 있는지 확인해 보세요.</Text>
        </View>
        <Text onPress={fetchPetTemplates} style={{ marginTop: 20, color: 'blue', textAlign: 'center' }}>[다시 시도]</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>🐾 펫 도감 목록</Text>
      <Text style={{ fontSize: 10, color: '#999', marginBottom: 10 }}>URL: {SUPABASE_URL || '환경변수 로드 실패'}</Text>
      
      {/* 6. 데이터를 리스트로 출력 */}
      <FlatList
        data={templates}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={{ marginTop: 20, textAlign: 'center', color: '#888' }}>데이터가 없습니다. (테이블이 비어있거나 RLS 설정 문제일 수 있습니다.)</Text>}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 5, padding: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
            <Text>{`[${item.rarity}] Lv.${item.level} ${item.pet_name}`}</Text>
            <Text style={{ fontSize: 12, color: '#666' }}>Type: {item.pet_type}</Text>
          </View>
        )}
      />
      <Text onPress={fetchPetTemplates} style={{ marginTop: 20, color: 'blue', textAlign: 'center' }}>[데이터 새로고침]</Text>
    </View>
  );
};

export default TestFile;