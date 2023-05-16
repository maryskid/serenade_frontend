import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LandingScreen from "../src/screens/LandingScreen";
import SignupScreen from "../src/screens/SignupScreen";
import ChooseYourGender from "../src/screens/ChooseYourGender";
import ChooseSexuality from "../src/screens/ChooseSexuality";
import ChooseRelationshipStatus from "../src/screens/ChooseRelationshipStatus";
import CreateUserInfos from "../src/screens/CreateUserInfos";
import SetProfilePictures from "../src/screens/SetProfilePictures";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="ChooseYourGender" component={ChooseYourGender} />
        <Stack.Screen name="ChooseSexuality" component={ChooseSexuality} />
        <Stack.Screen
          name="ChooseRelationshipStatus"
          component={ChooseRelationshipStatus}
        />
        <Stack.Screen name="CreateUserInfos" component={CreateUserInfos} />
        <Stack.Screen
          name="SetProfilePictures"
          component={SetProfilePictures}
        />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;