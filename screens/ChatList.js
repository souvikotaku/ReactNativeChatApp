import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Modal,
  TextInput,
  ImageBackground,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Public Group",
    collection: "chats",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Group",
    collection: "secondchats",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Private Group",
    collection: "privatechats",
  },
];

const Chatlist = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [collection, setCollection] = useState("");
  //   const [showM, setShowM] = useState("none");

  //   useEffect(() => {

  //   }, []);

  const continueToSignout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  //   const ModalComp = () => (
  //     <Modal ref={showModal}>
  //       <View style={{ flex: 1 }}>
  //         <Text>I am the modal content!</Text>
  //       </View>
  //     </Modal>
  //   );

  return (
    <>
      <ImageBackground
        style={{ width: "100%", height: "100%", flex: 1 }}
        resizeMode="cover"
        source={require("../assets/wall3.jpg")}
      >
        <SafeAreaView style={styles.container}>
          {/* <Modal>
          <View style={{ flex: 1 }}>
            <Text>I am the modal content!</Text>
          </View>
        </Modal> */}
          {DATA.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  console.log(`clicked ${index}`);
                  // const resetAction = CommonActions.reset({
                  //   index: 1,
                  //   routes: [
                  //     {
                  //       name: "Chatscreen2",
                  //       params: {
                  //         id: index,
                  //         title: item.title,
                  //       },
                  //     },
                  //   ],
                  // });
                  // navigation.dispatch(resetAction);

                  if (item.title === "Private Group") {
                    setModalVisible(true);
                    setTitle(item.title);
                    setCollection(item.collection);
                  } else {
                    navigation.navigate("ChatScreen", {
                      groupName: item.title,
                      collectionName: item.collection,
                    });
                  }
                }}
                key={index}
              >
                {/* <HStack space={5} style={{ alignItems: "center" }}>
                <Image
                  source={{
                    uri: "https://media.istockphoto.com/vectors/person-gray-photo-placeholder-woman-vector-id1074273082?s=612x612",
                  }}
                  style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
                />
                <Text style={styles.title}>{item.recipient}</Text>
              </HStack> */}
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
          <View style={{ marginLeft: "20%", marginRight: "15%" }}>
            <TouchableOpacity
              onPress={continueToSignout}

              // style={{ width: "100%", marginBottom: "5%" }}
            >
              <Text style={styles.button}>Sign out</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{ fontSize: 19 }}>Enter Password</Text>

                <View style={styles.modalInput}>
                  <TextInput
                    style={styles.modalTextInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="search"
                    placeholder="Password"
                    placeholderTextColor="#666666"
                    //   defaultValue={fieldName}

                    onChangeText={(text) => {
                      console.log(text);
                      setPassword(text);
                    }}
                    autoFocus={true}
                  />
                </View>
                <View style={styles.modalInput}>
                  <TouchableOpacity
                    style={[styles.button2, styles.buttonClose, styles.saveBtn]}
                    onPress={() => {
                      if (password === "666") {
                        setModalVisible(!modalVisible);
                        navigation.navigate("ChatScreen", {
                          groupName: title,
                          collectionName: collection,
                        });
                      } else {
                        alert("Wrong Password");
                      }
                    }}
                  >
                    <Text style={styles.textStyle}>Continue</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button2, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },

  item: {
    backgroundColor: "#e5a5ea",
    padding: 7,
    marginVertical: 1,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 23,
    color: "#974caa",
  },
  button: {
    backgroundColor: "pink",
    padding: 10,
    marginTop: 10,
    borderRadius: 35,
    width: "90%",
    textAlign: "center",
    fontSize: 20,
    color: "#564a80",
    borderColor: "#4134e8",
    borderWidth: 3,
    // borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },

  saveBtn: {
    backgroundColor: "#FF7F00",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",

    color: "#000",
  },
  modalTextInput: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
});

export default Chatlist;
