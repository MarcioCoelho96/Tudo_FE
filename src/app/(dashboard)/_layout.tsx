import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { CustomTabBar } from "../components/customTabBar";
import HomeScreen from "./home";                                      //h1/h2-------
import LocationScreen from "./location";                              //h3
import ProfileScreen from "./profile";                                //I123
import PaymentsScreen from "./pay";                                   //3-----------
import RestaurantSearchScreen from "./restaurant-search"              //h4
import OrderSummaryScreen from "./order-summary"                      //2-----------
import RestaurantSelectionScreen from "./restaurant-selection"        //1-----------
// payment-model.tsx ---------------------------------------------------4-----------

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
        component={LocationScreen}
        options={{
          title: "Home UI",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../../assets/images/pin-angle-fill.svg")}
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
              source={require("../../../assets/images/calendar-event-fill.svg")}
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
        component={RestaurantSelectionScreen}
        options={{
          title: "My Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../../assets/images/file-earmark-ruled-fill.svg")}
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
