import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  appBackgroundColor: "#1d2635",

  primaryColor: "#ec7955",

  secondaryColor: "#3e384e",

  placeholderColor: "#686178",

  whiteColor: "#fff",

  errorColor: "#9d0208",

  iconInactiveColor: "#bdbdbd",

  iconActiveColor: "#1d2635",

  screen: {
    flex: 1,
    backgroundColor: "#1d2635",
    alignItems: "center",
  },

  container: {
    flex: 1,
    padding: 25,
    width: "100%",
  },

  titleText: {
    fontSize: 20,
    lineHeight: 25,
    fontFamily: "LabGrostesque-Regular",
    color: "#fff",
  },

  mainText: {
    fontSize: 17,
    lineHeight: 25,
    fontFamily: "LabGrostesque-Regular",
    color: "#fff",
  },

  mainTextBlack: {
    fontSize: 17,
    lineHeight: 25,
    fontFamily: "LabGrostesque-Regular",
    color: "#000",
  },

  SucessText: {
    fontSize: 17,
    lineHeight: 25,
    fontFamily: "LabGrostesque-Regular",
    color: "#228B22",
  },

  mainTextPrimary: {
    fontSize: 17,
    lineHeight: 25,
    fontFamily: "LabGrostesque-Regular",
    color: "#ec7955",
  },

  textSmall: {
    fontSize: 14,
    color: "white",
    fontFamily: "LabGrostesque-Regular",
    lineHeight: 20,
  },

  textSmallColored: {
    fontSize: 14,
    color: "white",
    fontFamily: "LabGrostesque-Regular",
    lineHeight: 20,
    color: "#F0D3C9",
  },
});

export default globalStyles;
