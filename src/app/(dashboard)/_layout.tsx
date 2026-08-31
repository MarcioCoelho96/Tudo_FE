import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import { CustomTabBar } from "../components/customTabBar";
import HomeScreen from "./home";
//import LocationScreen from "./location";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState } from "react";
import CalendarScreen from "./calendar";
import LocationScreen from "./location";

export type TabParamList = {
  home: undefined;
  profile: undefined;
  location: undefined;
  calendar: undefined;
  restaurantSelection: undefined;
};

export default function DashboardLayout() {
  const Tabs = createBottomTabNavigator<TabParamList>();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleCalendar = useCallback(() => {
    if (isOpen) {
      bottomSheetRef.current?.close();
    } else {
      bottomSheetRef.current?.snapToIndex(0);
    }
  }, [isOpen]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
        opacity={0.5}
      />
    ),
    [],
  );

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Tabs.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          component={HomeScreen}
          options={{
            title: "Home UI",
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../../../assets/images/pin.png")}
                style={{
                  width: 35,
                  height: 35,
                  tintColor: color,
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          component={View}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              handleToggleCalendar();
            },
          }}
          options={{
            title: "Calendar",
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../../../assets/images/calendar.png")}
                style={{
                  width: 35,
                  height: 35,
                  tintColor: color,
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="location"
          // Original -> LocationScreen
          component={LocationScreen}
          options={{
            title: "My Profile",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../../../assets/images/file.png")}
                style={{
                  width: 35,
                  height: 35,
                  tintColor: color,
                }}
              />
            ),
          }}
        />
      </Tabs.Navigator>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["85%"]}
        index={-1}
        backdropComponent={renderBackdrop}
        onChange={(index) => setIsOpen(index >= 0)}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: "transparent" }}
        handleIndicatorStyle={{ backgroundColor: "#CBD5E0" }}
        handleComponent={null}
      >
        <CalendarScreen />
      </BottomSheet>
    </View>
  );
}
