import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenHome from './screens/ScreenHome';
import ScreenMain from './screens/ScreenMain';
import Screen01 from './screens/Screen01';
import Screen02 from './screens/Screen02';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ScreenHome' screenOptions={{headerShown:false}}>
        <Stack.Screen name = "ScreenHome" component={ScreenHome}/>
        <Stack.Screen name = "Screen01" component={Screen01}/>
        <Stack.Screen name = "Screen02" component={Screen02}/>
        <Stack.Screen name = "ScreenMain" component={ScreenMain}/>
        <Stack.Screen name = "ProfileScreen" component={ProfileScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
