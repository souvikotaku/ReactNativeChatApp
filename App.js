import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  // const AppNavigator = createNativeStackNavigator(
  //   {
  //     Login: LoginScreen,
  //     ChatScreen: ChatScreen,
  //   },
  //   {
  //     initialRouteName: "Login",
  //     defaultNavigationOptions: {
  //       headerStyle: {
  //         backgroundColor: "#f4511e",
  //       },
  //       headerTintColor: "#fff",
  //       headerTitleStyle: {
  //         fontWeight: "bold",
  //       },
  //     },
  //   }
  // );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerMode: "none",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerMode: "none",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            title: "Home",
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
