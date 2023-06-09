import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import globalStyles from "../../utils/globalStyles";
import Header from "../components/Header";
import SelectPicture from "../components/SelectPicture";
import ChooseBirthDate from "../components/ChooseBirthDate";
import { Divider, Modal, Portal, RadioButton } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import MainTextInput from "../components/MainTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RadioButtonItem from "../components/RadioButtonItem";
import { Snackbar } from "react-native-paper";
import moment from "moment";
import { useRoute } from "@react-navigation/native";
import { extractDateInfo } from "../../utils/transformDate";
import LoadingScreen from "./LoadingScreen";
import {
  updatedUserInfos,
  updateUserPictures,
} from "../../utils/authenticateUser";

import { useSelector } from "react-redux";

const UpdateProfile = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const userToken = useSelector((state) => state.user.token);
  const { userInfos } = route.params;

  const { day, month, year } = extractDateInfo(userInfos?.birthdate);
  //Map through the user pictures
  const [userPictures, setUserPictures] = useState(userInfos?.pictures);

  const DATA = [...userPictures, ...Array(6 - userPictures.length).fill(null)];

  //Used to track user picture in SelectPicture component via inverse data flow
  const getUserPictures = (value) => {
    setUserPictures([...userPictures, value]);
  };

  //Used to track user picture in SelectPicture component via inverse data flow
  const removeUserPicture = (value) => {
    setUserPictures(userPictures.filter((item) => item !== value));
  };

  //keep track of the birthdate component
  const [dayOfBirth, setDayOfBirth] = useState(day.toString());
  const [monthOfBirth, setMonthOfBirth] = useState(month.toString());
  const [yearOfBirth, setYearOfBirth] = useState(year.toString());
  const getDayOfBirth = (value) => {
    setDayOfBirth(value);
  };
  const getMonthOfBirth = (value) => {
    setMonthOfBirth(value);
  };
  const getYearOfBirth = (value) => {
    setYearOfBirth(value);
  };

  //Keep track of the job title
  const [occupation, setOccupation] = useState(userInfos?.occupation);
  const getOccupation = (value) => {
    setOccupation(value);
  };

  //Keep track of the user description
  const [userDescription, setUserDescription] = useState(
    userInfos?.description
  );
  const getUserDescription = (value) => {
    setUserDescription(value);
  };

  //Keep track of the gender modal
  const [genderModalvisible, setGenderModalVisible] = useState(false);
  const showGenderModal = () => setGenderModalVisible(true);
  const hideGenderModal = () => setGenderModalVisible(false);
  const [gender, setGender] = useState(userInfos?.gender);

  //Keep track of the Sexuality modal
  const [sexualityModalvisible, setSexualityModalVisible] = useState(false);
  const showSexualityModal = () => setSexualityModalVisible(true);
  const hideSexualityModal = () => setSexualityModalVisible(false);
  const [sexuality, setSexuality] = useState(userInfos?.sexuality);

  //Used for set error message in the snack bar
  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  //Used to set the snack bar visibility
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const dismissSnackBar = () => {
    setIsSnackBarVisible(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    if (userPictures.length < 2) {
      setIsSnackBarVisible(true);
      setErrorMessage("Please select at least 2 pictures");
      return;
    }

    if (
      monthOfBirth < 1 ||
      monthOfBirth > 12 ||
      Number(monthOfBirth) % 1 !== 0 ||
      typeof Number(monthOfBirth) !== "number"
    ) {
      setIsSnackBarVisible(true);
      setErrorMessage("Something seems wrong with your month of birth");
      return;
    }

    if (
      yearOfBirth < 1900 ||
      yearOfBirth > 2005 ||
      Number(yearOfBirth) % 1 !== 0 ||
      typeof Number(yearOfBirth) !== "number"
    ) {
      setIsSnackBarVisible(true);
      setErrorMessage("Your year of birth does not meet our requirements");
      return;
    }

    const userDateOfBirth = moment()
      .year(yearOfBirth)
      .month(monthOfBirth - 1)
      .date(dayOfBirth);

    const data = await updatedUserInfos({
      userToken,
      birthdate: userDateOfBirth,
      gender,
      sexuality,
      occupation,
      description: userDescription,
    });

    // if the user did change his pictures we uploading his new pictures again
    if (JSON.stringify(userPictures) !== JSON.stringify(userInfos?.pictures)) {
      const isPicturesUpdated = await updateUserPictures(
        userToken,
        userPictures
      );
      if (data.result === true && isPicturesUpdated.result === true) {
        setIsLoading(false);
        setIsSnackBarVisible(true);
        setSuccessMessage("Your profile has been updated successfully");

        setTimeout(() => {
          setIsSnackBarVisible(false);
          setSuccessMessage("");
          navigation.goBack();
        }, 3000);
        return;
      } else {
        setIsLoading(false);
        setIsSnackBarVisible(true);
        setErrorMessage(data.message);
        return;
      }
    }

    // if the user did not change his pictures we don't uploading new pictures
    // we just update the their infos
    if (data.result === true) {
      setIsLoading(false);
      setIsSnackBarVisible(true);
      setSuccessMessage("Your profile has been updated successfully");

      setTimeout(() => {
        setIsSnackBarVisible(false);
        setSuccessMessage("");
        navigation.goBack();
      }, 3000);
    } else {
      setIsLoading(false);
      setIsSnackBarVisible(true);
      setErrorMessage(data.message);
    }
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <KeyboardAvoidingView style={globalStyles.screen} className="pt-5 pb-10">
      <ScrollView style={globalStyles.container}>
        <View className="flex-row justify-between items-center">
          <View className="w-3/5">
            <Header />
          </View>
          <TouchableOpacity
            onPress={() => handleUpdateProfile()}
            style={{ backgroundColor: globalStyles.primaryColor }}
            className="mb-5 rounded-full h-10 w-10 justify-center items-center"
          >
            <MaterialCommunityIcons
              name="content-save-all"
              size={25}
              color="white"
            />
          </TouchableOpacity>
        </View>
        {(errorMessage || successMessage) && (
          <View className="mt-5">
            <Snackbar
              visible={isSnackBarVisible}
              onDismiss={dismissSnackBar}
              action={{
                label: "Dismiss",
              }}
              duration={2000}
            >
              {errorMessage && (
                <Text style={globalStyles.mainTextPrimary}>{errorMessage}</Text>
              )}
              {successMessage && (
                <Text style={globalStyles.mainText}>{successMessage}</Text>
              )}
            </Snackbar>
          </View>
        )}

        <Text className="mb-5" style={globalStyles.titleText}>
          Edit your photos
        </Text>

        <FlatList
          //Render user pictures
          className="mb-7"
          data={DATA}
          numColumns={3}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: "33.3%",
                height: 120,
                justifyContent: "center",
              }}
            >
              <SelectPicture
                getUserPictures={getUserPictures}
                removeUserPicture={removeUserPicture}
                picture={item}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
        <ChooseBirthDate
          dayOfBirth={dayOfBirth}
          monthOfBirth={monthOfBirth}
          yearOfBirth={yearOfBirth}
          getDayOfBirth={getDayOfBirth}
          getMonthOfBirth={getMonthOfBirth}
          getYearOfBirth={getYearOfBirth}
        />
        <View className="mb-7">
          <Text className="mb-5" style={globalStyles.titleText}>
            Your gender
          </Text>
          <TouchableOpacity
            className="flex-row justify-between mb-2"
            onPress={() => {
              showGenderModal(true);
            }}
          >
            <Text style={globalStyles.mainText}>{gender}</Text>
            <Entypo name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
          <Divider />
          <Portal>
            <Modal
              visible={genderModalvisible}
              onDismiss={hideGenderModal}
              contentContainerStyle={{
                backgroundColor: "white",
                width: "70%",
                height: "40%",
                alignSelf: "center",
                borderRadius: 5,
                backgroundColor: "#4A5364",
                paddingHorizontal: 10,
              }}
            >
              <RadioButton.Group
                onValueChange={(value) => {
                  setGender(value);
                  setGenderModalVisible(false);
                }}
                value={gender}
              >
                <RadioButtonItem label="Man" value="Man" />
                <RadioButtonItem label="Woman" value="Woman" />
                <RadioButtonItem label="Non-binary" value="Non-binary" />
              </RadioButton.Group>
            </Modal>
          </Portal>
        </View>
        <View className="mb-7">
          <Text className="mb-5" style={globalStyles.titleText}>
            Your sexuality
          </Text>
          <TouchableOpacity
            className="flex-row justify-between mb-2"
            onPress={() => {
              showSexualityModal(true);
            }}
          >
            <Text style={globalStyles.mainText}>{sexuality}</Text>
            <Entypo name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
          <Divider />
          <Portal>
            <Modal
              visible={sexualityModalvisible}
              onDismiss={hideSexualityModal}
              contentContainerStyle={{
                backgroundColor: "white",
                width: "80%",
                height: "75%",
                alignSelf: "center",
                borderRadius: 5,
                backgroundColor: "#4A5364",
                paddingHorizontal: 10,
              }}
            >
              <RadioButton.Group
                onValueChange={(value) => {
                  setSexuality(value);
                  setSexualityModalVisible(false);
                }}
                value={sexuality}
              >
                <RadioButtonItem label="Straight" value="Straight" />
                <RadioButtonItem label="Gay" value="Gay" />
                <RadioButtonItem label="Lesbian" value="Lesbian" />
                <RadioButtonItem label="Bisexual" value="Bisexual" />
                <RadioButtonItem label="Pansexual" value="Pansexual" />
                <RadioButtonItem label="Polysexual" value="Polysexual" />
                <RadioButtonItem label="Queer" value="Queer" />
              </RadioButton.Group>
            </Modal>
          </Portal>
        </View>
        <View className="mb-7">
          <MainTextInput
            title="What's your job title?"
            placeholder="UX Designer"
            //Send getOccupation function as prop to get the occupation value in the component via inverse data flow
            getInputValue={getOccupation}
            //Pass the value of the input as prop in order to be able to clear it after form submission
            value={occupation}
          />
        </View>
        <View className="mb-7">
          <MainTextInput
            title="Say something about yourself"
            placeholder="Tell a little story about you..."
            //Send getUserDescription function as prop to get the description value in the component via inverse data flow
            getInputValue={getUserDescription}
            //Pass the value of the input as prop in order to be able to clear it after form submission
            value={userDescription}
            multiline={true}
          />
          <View className="flex-row justify-between">
            <Text style={globalStyles.textSmall}>
              Phone Number are not allowed
            </Text>
            <Text style={globalStyles.textSmall}>
              {userDescription?.length || 0}/80
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpdateProfile;
