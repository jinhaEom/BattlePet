import "./global.css"
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import TestFile from './src/testfile';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Navigation } from '@/ui/navigation';
function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


export default App;
