

//사용자는 초대코드를입력하여 다른사용자와 같은방에 진입이 가능하다.
//혹은 방장을 하고싶은 사용자는 방을 생성하여 초대코드 생성이 가능하다. 방을 생성하면 homescreen으로 이동한다.

import { useRootNavigation } from "@/ui/navigation";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

const ChoiceScreen = () => {
    const navigation = useRootNavigation();

    const writeRoomNum = () =>{
        navigation.navigate('WriteScreen');
    }
    return (
  <View style={{flex: 1, backgroundColor:'#ffffff'}}>
        <Text onPress={writeRoomNum}>방만들기</Text>
        <Text>방선택하기</Text>
    </View>

    )
}

export default ChoiceScreen;