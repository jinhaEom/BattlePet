import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import TestFile from './src/testfile';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Navigation } from '@/ui/navigation';
function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


export default App;
