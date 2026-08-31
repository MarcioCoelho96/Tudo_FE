import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import BookingOptionModal from "./booking-option-modal";

interface BookingModalProps {
  visible: boolean;
  onClose: () => void;
  onOrderAndBook: () => void;
}

type TabType = "data" | "hora" | "pessoas";

const TIME_SLOTS = [
  "00:00", "00:30", "01:00", "01:30", "02:00", "02:30",
  "03:00", "03:30", "04:00", "04:30", "05:00", "05:30",
  "06:00", "06:30", "07:00", "07:30", "08:00", "08:30",
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00", "22:30", "23:00", "23:30",
];

const PEOPLE_SLOTS = Array.from(
  { length: 39 },
  (_, i) => `${i + 1} Pessoa${i > 0 ? "s" : ""}`
);

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

export default function BookingModal({
  visible,
  onClose,
  onOrderAndBook,
}: BookingModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("data");
  const [selectedDate, setSelectedDate] = useState<number>(26);
  const [calendarMonth, setCalendarMonth] = useState<number>(2); // Março
  const [calendarYear, setCalendarYear] = useState<number>(2026);
  const [selectedTimes, setSelectedTimes] = useState<string[]>(["20:00"]);
  const [selectedPeople, setSelectedPeople] = useState<string>("2 Pessoas");
  const [isOptionModalVisible, setIsOptionModalVisible] = useState(false);

  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const leadingEmptyDays =
    (new Date(calendarYear, calendarMonth, 1).getDay() + 6) % 7;

  const goToPrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  };

  const toggleTime = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleNext = () => {
    if (activeTab === "data") setActiveTab("hora");
    else if (activeTab === "hora") setActiveTab("pessoas");
    else if (activeTab === "pessoas") {
      setIsOptionModalVisible(true);
    }
  };

  const handleResetAndClose = () => {
    setActiveTab("data");
    onClose();
  };

  const handleConfirmBookingOption = () => {
    setIsOptionModalVisible(false);
    setActiveTab("data");
    onOrderAndBook();
  };

  return (
    <>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleResetAndClose}
      statusBarTranslucent={true}
    >
      <View style={styles.backdrop}>
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          onPress={handleResetAndClose}
          activeOpacity={1}
        />

        <View style={styles.sheetCard}>
          {/* Fundo dinâmico com orangeBooking.svg */}
          <Image
            source={require("../../../assets/images/orangeBooking.svg")}
            style={StyleSheet.absoluteFillObject}
            contentFit="fill"
          />

          <View style={styles.innerWrapper}>
            <View style={styles.headerSection}>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={styles.nextButtonText}>
                  {activeTab === "pessoas" ? "RESERVAR" : "SEGUINTE"}
                </Text>
              </TouchableOpacity>

              <View style={styles.tabsRow}>
                <TouchableOpacity
                  style={[
                    styles.tabPill,
                    activeTab === "data" && styles.activeTabPill,
                  ]}
                  onPress={() => setActiveTab("data")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "data" && styles.activeTabText,
                    ]}
                  >
                    Data
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.tabPill,
                    activeTab === "hora" && styles.activeTabPill,
                  ]}
                  onPress={() => setActiveTab("hora")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "hora" && styles.activeTabText,
                    ]}
                  >
                    Hora
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.tabPill,
                    activeTab === "pessoas" && styles.activeTabPill,
                  ]}
                  onPress={() => setActiveTab("pessoas")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "pessoas" && styles.activeTabText,
                    ]}
                  >
                    Pessoas
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.contentBody}>
              {/* ABA DATA */}
              {activeTab === "data" && (
                <View style={styles.calendarCard}>
                  <View style={styles.monthNavRow}>
                    <TouchableOpacity onPress={goToPrevMonth} hitSlop={10}>
                      <Ionicons
                        name="chevron-back"
                        size={18}
                        color={colors.main}
                      />
                    </TouchableOpacity>

                    <Text style={styles.monthTitle}>
                      {MONTH_NAMES[calendarMonth]} {calendarYear}
                    </Text>

                    <TouchableOpacity onPress={goToNextMonth} hitSlop={10}>
                      <Ionicons
                        name="chevron-forward"
                        size={18}
                        color={colors.main}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.weekDaysRow}>
                    {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map(
                      (d, i) => (
                        <Text key={i} style={styles.weekDayText}>
                          {d}
                        </Text>
                      )
                    )}
                  </View>
                  <View style={styles.daysGrid}>
                    {Array.from({ length: leadingEmptyDays }, (_, i) => (
                      <View key={`empty-${i}`} style={styles.dayCell} />
                    ))}
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                      (day) => {
                        const isSelected = day === selectedDate;
                        return (
                          <TouchableOpacity
                            key={day}
                            style={[
                              styles.dayCell,
                              isSelected && styles.selectedDayCell,
                            ]}
                            onPress={() => setSelectedDate(day)}
                          >
                            <Text
                              style={[
                                styles.dayText,
                                isSelected && styles.selectedDayText,
                              ]}
                            >
                              {day}
                            </Text>
                          </TouchableOpacity>
                        );
                      }
                    )}
                  </View>
                </View>
              )}

              {/* ABA HORA (com fundo branco arredondado) */}
              {activeTab === "hora" && (
                <View style={styles.whiteCardContainer}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollContainer}
                  >
                    <View style={styles.grid3Cols}>
                      {TIME_SLOTS.map((time) => {
                        const isSelected = selectedTimes.includes(time);
                        return (
                          <TouchableOpacity
                            key={time}
                            style={[
                              styles.pillButton,
                              isSelected && styles.selectedPillButton,
                            ]}
                            onPress={() => toggleTime(time)}
                          >
                            <Text
                              style={[
                                styles.pillText,
                                isSelected && styles.selectedPillText,
                              ]}
                            >
                              {time}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              )}

              {/* ABA PESSOAS (com fundo branco arredondado) */}
              {activeTab === "pessoas" && (
                <View style={styles.whiteCardContainer}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollContainer}
                  >
                    <View style={styles.grid3Cols}>
                      {PEOPLE_SLOTS.map((p) => {
                        const isSelected = p === selectedPeople;
                        return (
                          <TouchableOpacity
                            key={p}
                            style={[
                              styles.pillButton,
                              isSelected && styles.selectedPillButton,
                            ]}
                            onPress={() => setSelectedPeople(p)}
                          >
                            <Text
                              style={[
                                styles.pillText,
                                isSelected && styles.selectedPillText,
                              ]}
                            >
                              {p}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              )}

            </View>
          </View>
        </View>
      </View>
    </Modal>

    <BookingOptionModal
      visible={isOptionModalVisible}
      onClose={() => setIsOptionModalVisible(false)}
      onConfirm={handleConfirmBookingOption}
    />
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "flex-end",
  },

  sheetCard: {
    width: "100%",
    minHeight: 520,
    maxHeight: "100%",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    overflow: "hidden",
    position: "relative",
  },

  innerWrapper: {
    flex: 1,
    padding: 20,
    zIndex: 2,
  },

  headerSection: {
    marginBottom: 15,
  },

  nextButton: {
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 40,
    alignSelf: "flex-start",
    marginBottom: 10,
  },

  nextButtonText: {
    fontWeight: "800",
    fontSize: 15,
    color: colors.main,
  },

  tabsRow: {
    flexDirection: "row",
    gap: 10,
  },

  tabPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: colors.white,
    alignItems: "center",
  },

  activeTabPill: {
    backgroundColor: colors.white,
  },

  tabText: {
    fontSize: 13,
    fontWeight: "400",
    color: colors.main,
  },

  activeTabText: {
    color: colors.main,
    fontWeight: "800",
  },

  contentBody: {
    flex: 1,
  },

  whiteCardContainer: {
    backgroundColor: colors.white,
    borderRadius: 30,
    padding: 15,
    height: 300,
  },

  scrollContainer: {
    maxHeight: 320,
  },

  calendarCard: {
    backgroundColor: colors.white,
    borderRadius: 30,
    padding: 15,
  },

  monthNavRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  monthTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.main,
    textAlign: "center",
  },

  weekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },

  weekDayText: {
    fontSize: 12,
    color: colors.main,
    fontWeight: "400",
    width: 30,
    textAlign: "center",
  },

  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  dayCell: {
    width: "14.28%",
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  selectedDayCell: {
    backgroundColor: colors.orange,
    borderRadius: 18,
  },

  dayText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333333",
  },

  selectedDayText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  grid3Cols: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  pillButton: {
    width: "31%",
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    marginBottom: 8,
  },

  selectedPillButton: {
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },

  pillText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.main,
  },

  selectedPillText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },
});