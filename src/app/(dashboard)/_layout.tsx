import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { CustomTabBar } from "../components/customTabBar";
import HomeScreen from "./home";
//import LocationScreen from "./location";
import ProfileScreen from "./profile";
//import RestaurantSelectionScreen from "./restaurant-selection";
import OrderSummaryScreen from "./order-summary";

export type TabParamList = {
  home: undefined;
  profile: undefined;
  location: undefined;
  restaurantSelection: undefined;
};

export default function DashboardLayout() {
  const Tabs = createBottomTabNavigator<TabParamList>();
  return (
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
        name="profile"
        component={ProfileScreen}
        options={{
          title: "My Profile",
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
        component={OrderSummaryScreen}
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
  );
}
