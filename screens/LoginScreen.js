import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
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
              name: "ChatScreen",
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
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input1}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Email"
          placeholderTextColor="#BDBDBD"
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
          placeholderTextColor="#BDBDBD"
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
      <View>
        <TouchableOpacity>
          <Text style={styles.button} onPress={Login}>
            sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.button} onPress={continueToRegister}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    borderColor: "#FFF395",
    backgroundColor: "white",
    borderRadius: 35,
    opacity: 0.6,
    paddingHorizontal: 10,
    width: "90%",
  },
  button: {
    backgroundColor: "#FFF395",
    padding: 10,
    marginTop: 10,
    borderRadius: 35,
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },
});
