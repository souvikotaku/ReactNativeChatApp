import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { CommonActions } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const resetAction = CommonActions.reset({
          index: 1,
          routes: [
            {
              // name: newData === null ? "Home" : "Homebkup",
              name: "ChatList",
            },
          ],
        });
        navigation.dispatch(resetAction);
      }
    });

    return unsubscribe;
  }, []);

  const Login = () => {
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.email);
        // alert("Registered Successfully");
        // navigation.navigate("ChatScreen", { name: name });
        // ...
      })
      .catch((error) => {
        alert(error.message);
        // ..
      });
  };

  const continueToHome = () => {
    navigation.navigate("ChatScreen", { name: name });
  };

  const continueToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%", flex: 1 }}
      resizeMode="cover"
      source={require("../assets/wall1.jpg")}
    >
      <Image source={require("../assets/mainLogo.png")} style={styles.logo} />
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}>Login</Text>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input1}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            placeholder="Email"
            placeholderTextColor="purple"
            // value={chars}
            //   value={props.values.username}
            onChangeText={(text) => {
              console.log(text);
              // setChars(text);
              setEmail(text);
              // callUsernameApi(text);
            }}
            //   ref={textinputemail}
            value={email}
          />
        </View>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input1}
            autoCapitalize="none"
            autoCorrect={false}
            // keyboardType="default"
            returnKeyType="next"
            placeholder="Password"
            placeholderTextColor="purple"
            // value={chars}
            //   value={props.values.username}
            onChangeText={(text) => {
              console.log(text);
              // setChars(text);
              setPass(text);
              // callUsernameApi(text);
            }}
            //   ref={textinputemail}
            value={pass}
          />
        </View>
        <View style={{ width: "90%" }}>
          <TouchableOpacity style={{ marginTop: 10 }} onPress={Login}>
            <Text style={styles.button}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={continueToRegister}
          >
            <Text style={styles.button2}>Sign up page</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontSize: 15, color: "pink" }}>
            made by Souvik Das
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  input1: {
    paddingHorizontal: 10,
    color: "black",
    width: 327,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "lightblue",
    backgroundColor: "white",
    borderRadius: 35,
    opacity: 0.6,
    paddingHorizontal: 10,
    width: "90%",
  },
  button: {
    backgroundColor: "#b92962",
    padding: 10,
    borderRadius: 35,
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    color: "pink",
  },
  button2: {
    backgroundColor: "#e74d87",
    padding: 10,
    borderRadius: 35,
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    color: "pink",
  },
  logo: {
    alignSelf: "center",
    marginTop: "13%",
    marginBottom: "-45%",
  },
});
