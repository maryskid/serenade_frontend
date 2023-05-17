import { View, Text, StyleSheet } from "react-native";
import React from "react";
import globalStyles from "../../utils/globalStyles";
import ChatUserAvatar from "../components/ChatUserAvatar";

const ChatRecipientMessage = (props) => {

  const size = props.size;
  const connected = props.connected;
  const avatarImage = props.avatarImage;
  const avatarDisplay = props.avatarDisplay;


  return (
    <View style={styles.message1Container}>

      <View style={[styles.leftContainer, { width: props.size }]}>

        <ChatUserAvatar connected={connected} size={size} avatarImage={avatarImage} avatarDisplay={avatarDisplay} />

      </View>

      <View style={styles.message1}>
        <View style={styles.date1}>
          <Text style={styles.dateText}>{props.date}</Text>
        </View>
        <View style={styles.textContainer1}>
          <Text style={styles.text} >{props.text}</Text>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  date1: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 15,
    paddingBottom: 5,
  },

  dateText: {
    color: "#F0D3C9",
    fontSize: 14,
  },

  leftContainer: {
    marginRight: 10,
    justifyContent: "flex-end",
  },

  message1: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    maxWidth: "70%",
  },

  message1Container: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  },

  textContainer1: {
    color: "#ffffff",
    backgroundColor: "#3E384E",
    minHeight: 38,
    justifyContent: "center",
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 20,
  },

  text: {
    fontSize: 16,
    lineHeight: 22,
    color: "#ffffff"
  },



})

export default ChatRecipientMessage;