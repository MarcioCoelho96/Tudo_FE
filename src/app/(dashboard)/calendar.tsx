import { BottomSheetView } from "@gorhom/bottom-sheet"; // Import this
import { ImageBackground } from "expo-image";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState("2026-03-01");

  return (
    <BottomSheetView style={styles.sheetContainer}>
      <OrangeCurvedBackground>
        {/* Top Button */}
        <TouchableOpacity style={styles.seguinteBtn}>
          <Text style={styles.seguinteText}>SEGUINTE</Text>
        </TouchableOpacity>

        {/* Tab Controls */}
        <View style={styles.segmentedControl}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Hora</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Pessoas</Text>
          </TouchableOpacity>
        </View>

        {/* Custom Calendar Card */}
        <View style={styles.calendarCard}>
          <Calendar
            current={"2026-03-01"}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: "#EE5D00" },
            }}
            theme={{
              calendarBackground: "#FFFFFF",
              textSectionTitleColor: "#4A5568",
              selectedDayBackgroundColor: "#EE5D00",
              selectedDayTextColor: "#FFFFFF",
              todayTextColor: "#EE5D00",
              dayTextColor: "#2D3748",
              textDisabledColor: "#CBD5E0",
              monthTextColor: "#1A202C",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "600",
            }}
          />
        </View>
      </OrangeCurvedBackground>
    </BottomSheetView>
  );
}

export const OrangeCurvedBackground = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ImageBackground
      source={require("../../../assets/images/calendarBg.png")}
      style={{
        height: "100%",
        position: "absolute",
        left: -5,
        right: -5,
      }}
      contentFit={"fill"}
    >
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    backgroundColor: "transparent",
    bottom: 160,
  },
  container: {
    width: "100%",
    position: "relative",
  },
  content: {
    padding: 16,
  },
  seguinteBtn: {
    backgroundColor: "#F8FAFC",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: "flex-start",
    marginBottom: 26,
    width: 190,
    height: 61,
    justifyContent: "center",
    alignItems: "center",
  },
  seguinteText: {
    fontWeight: "900",
    color: "#1E293B",
    fontSize: 16,
  },
  segmentedControl: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
  },
  tabText: {
    color: "#64748B",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#0F172A",
    fontWeight: "700",
  },
  calendarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 12,
    overflow: "hidden",
  },
});
