import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Tabs } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Image, View } from "react-native";
import { CustomTabBar } from "../components/customTabBar";
import CalendarScreen from "./calendar";

export type TabParamList = {
  home: undefined;
  profile: undefined;
  location: undefined;
  calendar: undefined;
  restaurantSelection: undefined;
  orderSummary: undefined;
  pay: undefined;
};

export default function DashboardLayout() {
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
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
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
      </Tabs>

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
        <CalendarScreen onClose={() => bottomSheetRef.current?.close()} />
      </BottomSheet>
    </View>
  );
}
