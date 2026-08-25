import { colors } from "@/styles/global";
import { BottomSheetView } from "@gorhom/bottom-sheet"; // Import this
import { ImageBackground } from "expo-image";
import { getLocales } from "expo-localization";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

enum BookingStep {
  Date = "data",
  Hour = "hora",
  People = "pessoas",
}

const TIME_SLOTS = Array.from({ length: 48 }, (_, index) => {
  const hours = Math.floor(index / 2)
    .toString()
    .padStart(2, "0");
  const minutes = index % 2 === 0 ? "00" : "30";
  return `${hours}:${minutes}`;
});

const PEOPLE_OPTIONS = Array.from({ length: 39 }, (_, index) => index + 1);

const ITEMS_PER_PAGE = 18;

export default function CalendarScreen() {
  const [today, setToday] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.Date);
  const [selectedTime, setSelectedTime] = useState("19:30");
  const [selectedPeople, setSelectedPeople] = useState(2);
  const [hourPage, setHourPage] = useState(0);
  const [peoplePage, setPeoplePage] = useState(0);

  const paginatedTimeSlots = TIME_SLOTS.slice(
    hourPage * ITEMS_PER_PAGE,
    (hourPage + 1) * ITEMS_PER_PAGE,
  );
  const totalHourPages = Math.ceil(TIME_SLOTS.length / ITEMS_PER_PAGE);

  const paginatedPeopleOptions = PEOPLE_OPTIONS.slice(
    peoplePage * ITEMS_PER_PAGE,
    (peoplePage + 1) * ITEMS_PER_PAGE,
  );
  const totalPeoplePages = Math.ceil(PEOPLE_OPTIONS.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const deviceLanguageCode = getLocales()[0].languageCode || "en";

    if (LocaleConfig.locales[deviceLanguageCode]) {
      LocaleConfig.defaultLocale = deviceLanguageCode;
    } else {
      LocaleConfig.defaultLocale = "en";
    }

    const currentDate = new Date().toISOString().split("T")[0];
    setToday(currentDate);
    setSelectedDate(currentDate);
  }, []);

  const resources = {
    nextButton: "SEGUINTE",
    dateText: "Data",
    hourText: "Hora",
    peopleText: "Pessoas",
    bookingText: "RESERVAR",
  };

  const isDate = currentStep === BookingStep.Date;
  const isHour = currentStep === BookingStep.Hour;
  const isPeople = currentStep === BookingStep.People;

  const handleNextStep = () => {
    if (isDate) {
      setCurrentStep(BookingStep.Hour);
    } else if (isHour) {
      setCurrentStep(BookingStep.People);
    } else if (isPeople) {
      return 0;
    }
  };

  return (
    <BottomSheetView style={styles.sheetContainer}>
      <OrangeCurvedBackground>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNextStep}>
          <Text style={styles.nextText}>
            {currentStep === BookingStep.People
              ? resources.bookingText
              : resources.nextButton}
          </Text>
        </TouchableOpacity>

        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[styles.tab, isDate && styles.activeTab]}
            onPress={() => setCurrentStep(BookingStep.Date)}
          >
            <Text style={isDate ? styles.activeTabText : styles.tabText}>
              {resources.dateText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, isHour && styles.activeTab]}
            onPress={() => setCurrentStep(BookingStep.Hour)}
          >
            <Text style={isHour ? styles.activeTabText : styles.tabText}>
              {resources.hourText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, isPeople && styles.activeTab]}
            onPress={() => setCurrentStep(BookingStep.People)}
          >
            <Text style={isPeople ? styles.activeTabText : styles.tabText}>
              {resources.peopleText}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calendarCard}>
          {isDate && (
            <Calendar
              current={today}
              minDate={today}
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: colors.orange,
                },
              }}
              theme={{
                calendarBackground: colors.white,
                textSectionTitleColor: colors.main,
                selectedDayBackgroundColor: colors.orange,
                selectedDayTextColor: colors.white,
                todayTextColor: colors.orange,
                dayTextColor: colors.main,
                textDisabledColor: colors.gray,
                monthTextColor: colors.main,
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "600",
                arrowColor: colors.orange,
                arrowStyle: {},
              }}
            />
          )}

          {isHour && (
            <View style={styles.paginatedView}>
              <View style={styles.paginationHeader}>
                <TouchableOpacity
                  disabled={hourPage === 0}
                  onPress={() => setHourPage((prev) => Math.max(prev - 1, 0))}
                  style={[
                    styles.arrowButton,
                    hourPage === 0 && styles.disabledArrow,
                  ]}
                >
                  <Text style={styles.arrowText}>{"‹"}</Text>
                </TouchableOpacity>

                <Text style={styles.pageTitle}>
                  Página {hourPage + 1} de {totalHourPages}
                </Text>

                <TouchableOpacity
                  disabled={hourPage >= totalHourPages - 1}
                  onPress={() =>
                    setHourPage((prev) =>
                      Math.min(prev + 1, totalHourPages - 1),
                    )
                  }
                  style={[
                    styles.arrowButton,
                    hourPage >= totalHourPages - 1 && styles.disabledArrow,
                  ]}
                >
                  <Text style={styles.arrowText}>{"›"}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.gridGridContainer}>
                {paginatedTimeSlots.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <TouchableOpacity
                      key={time}
                      style={[
                        styles.pillButton,
                        isSelected
                          ? styles.pillSelected
                          : styles.pillUnselected,
                      ]}
                      onPress={() => setSelectedTime(time)}
                    >
                      <Text
                        style={[
                          styles.pillText,
                          isSelected
                            ? styles.pillTextSelected
                            : styles.pillTextUnselected,
                        ]}
                      >
                        {time}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
          {isPeople && (
            <View style={styles.paginatedView}>
              <View style={styles.paginationHeader}>
                <TouchableOpacity
                  disabled={peoplePage === 0}
                  onPress={() => setPeoplePage((prev) => Math.max(prev - 1, 0))}
                  style={[
                    styles.arrowButton,
                    peoplePage === 0 && styles.disabledArrow,
                  ]}
                >
                  <Text style={styles.arrowText}>{"‹"}</Text>
                </TouchableOpacity>

                <Text style={styles.pageTitle}>
                  Página {peoplePage + 1} de {totalPeoplePages}
                </Text>

                <TouchableOpacity
                  disabled={peoplePage >= totalPeoplePages - 1}
                  onPress={() =>
                    setPeoplePage((prev) =>
                      Math.min(prev + 1, totalPeoplePages - 1),
                    )
                  }
                  style={[
                    styles.arrowButton,
                    peoplePage >= totalPeoplePages - 1 && styles.disabledArrow,
                  ]}
                >
                  <Text style={styles.arrowText}>{"›"}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.gridGridContainer}>
                {paginatedPeopleOptions.map((count) => {
                  const isSelected = selectedPeople === count;
                  const label = `${count} ${count === 1 ? "Pessoa" : "Pessoas"}`;
                  return (
                    <TouchableOpacity
                      key={count}
                      style={[
                        styles.pillButton,
                        isSelected
                          ? styles.pillSelected
                          : styles.pillUnselected,
                      ]}
                      onPress={() => setSelectedPeople(count)}
                    >
                      <Text
                        style={[
                          styles.pillText,
                          isSelected
                            ? styles.pillTextSelected
                            : styles.pillTextUnselected,
                        ]}
                      >
                        {label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
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
      <View style={{ padding: 16 }}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    backgroundColor: "transparent",
    bottom: 140,
  },
  nextBtn: {
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
  nextText: {
    fontWeight: "900",
    color: colors.main,
    fontSize: 16,
  },
  segmentedControl: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: colors.white,
  },
  tabText: {
    color: colors.main,
    fontWeight: "400",
  },
  activeTabText: {
    color: colors.main,
    fontWeight: "900",
  },
  calendarCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 12,
    overflow: "hidden",
  },
  gridGridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 8,
    rowGap: 10,
  },
  pillButton: {
    width: "31%",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  pillUnselected: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.main,
  },
  pillSelected: {
    backgroundColor: colors.orange,
    borderWidth: 1,
    borderColor: colors.orange,
  },
  pillText: {
    fontSize: 14,
    fontWeight: "600",
  },
  pillTextUnselected: {
    color: colors.main,
  },
  pillTextSelected: {
    color: colors.white,
  },
  paginatedView: {
    width: "100%",
  },
  paginationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  pageTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.main,
  },
  arrowButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  arrowText: {
    fontSize: 26,
    fontWeight: "600",
    color: colors.orange || colors.orange,
  },
  disabledArrow: {
    opacity: 0.2,
  },
});

LocaleConfig.locales["pt"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan.",
    "Fev.",
    "Mar.",
    "Abr.",
    "Mai.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Set.",
    "Out.",
    "Nov.",
    "Dez.",
  ],
  dayNames: [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
};

LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene.",
    "Feb.",
    "Mar.",
    "Abr.",
    "May.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dic.",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
};
