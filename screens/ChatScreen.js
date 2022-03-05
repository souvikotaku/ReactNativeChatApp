import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";

const Chatscreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });

    console.log("username", auth?.currentUser?.email);

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  const continueToSignout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <GiftedChat
        // renderUsernameOnMessage={true}
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
          // avatar: "https://i.pravatar.cc/300",
          name: auth?.currentUser?.email,
        }}
      />
      <View
        style={{ marginLeft: "20%", marginRight: "15%", marginBottom: "3%" }}
      >
        <TouchableOpacity
          onPress={continueToSignout}
          // style={{ width: "100%", marginBottom: "5%" }}
        >
          <Text style={styles.button}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Chatscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#FFF395",
    padding: 10,
    marginTop: 10,
    borderRadius: 35,
    width: "90%",
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },
});
