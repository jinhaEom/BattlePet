import "./global.css"
import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Navigation } from '@/ui/navigation';
function App() {
  return (
    <SafeAreaProvider>
     
      <SafeAreaView className="flex-1">
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


export default App;
