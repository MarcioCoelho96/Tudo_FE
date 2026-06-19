import FontAwesome from "@expo/vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-remix-icon";
import { CustomTabBar } from "../components/customTabBar";
import HomeScreen from "./home";
import ProfileScreen from "./profile";
export type TabParamList = {
  home: undefined;
  profile: undefined;
  calendar: undefined;
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
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: "My Profile",
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-event-line" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        component={ProfileScreen}
        options={{
          title: "My Profile",
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
}
