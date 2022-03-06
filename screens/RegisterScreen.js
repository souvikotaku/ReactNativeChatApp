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
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { CommonActions } from "@react-navigation/native";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // navigation.navigate("ChatScreen");

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

  const Register = () => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.email);
        alert("Registered Successfully");
        // navigation.navigate("ChatScreen", { name: name });
        // ...
      })
      .catch((error) => {
        alert(error.message);
        // ..
      });
  };

  const continueToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%", flex: 1 }}
      resizeMode="cover"
      source={require("../assets/wall2.jpg")}
    >
      <Image source={require("../assets/mainLogo.png")} style={styles.logo} />
      <View style={styles.container}>
        <Text style={{ fontSize: 30, color: "#fbde30", marginBottom: "5%" }}>
          Register
        </Text>
        {/* <View style={styles.inputWrap}>
        <TextInput
          style={styles.input1}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Username"
          placeholderTextColor="#BDBDBD"
          // value={chars}
          //   value={props.values.username}
          onChangeText={(text) => {
            console.log(text);
            // setChars(text);
            setName(text);
            // callUsernameApi(text);
          }}
          //   ref={textinputemail}
          value={name}
        />
      </View>
       */}
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input1}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            placeholder="Email"
            placeholderTextColor="#f34949"
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
            // keyboardType="password"
            returnKeyType="next"
            placeholder="Password"
            placeholderTextColor="#f34949"
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
          <TouchableOpacity style={{ marginTop: 10 }} onPress={Register}>
            <Text style={styles.button}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 10 }} onPress={continueToLogin}>
            <Text style={styles.button}>Login Page</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontSize: 15, color: "#fbde30" }}>
            made by Souvik Das
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
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
    borderColor: "#f34949",
    backgroundColor: "white",
    borderRadius: 35,
    opacity: 0.6,
    paddingHorizontal: 10,
    width: "90%",
  },
  button: {
    backgroundColor: "#f34949",
    padding: 10,
    // marginTop: 10,
    borderRadius: 35,
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    color: "#fbde30",
  },
  logo: {
    alignSelf: "center",
    marginTop: "13%",
    marginBottom: "-45%",
  },
});
