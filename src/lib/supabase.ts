import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

/**
 * Supabase 클라이언트 설정
 * 
 * [폴리필 설명]
 * React Native 환경에는 브라우저에서 제공하는 URL 표준 API가 내장되어 있지 않아
 * Supabase 라이브러리 내부에서 오류가 발생할 수 있습니다.
 * 'react-native-url-polyfill/auto'를 최상단에 import하여 이를 해결합니다.
 * 
 * [보안 설명]
 * SUPABASE_URL과 SUPABASE_ANON_KEY는 .env 파일에서 관리합니다.
 * 이 값들은 클라이언트 사이드에서 사용되는 'anon' 키이므로 공개되어도 
 * Row Level Security(RLS)가 잘 설정되어 있다면 안전합니다.
 */

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase URL or Anon Key is missing. Check your .env file.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
