import { StatusBar } from "expo-status-bar";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import { Audio } from "expo-av";

const colors = ["#f7dc6f", "#a2d9ce", "#d7bde2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState<any>("POMO");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 5 * 60 : 25 * 60);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStartStop = () => {
    playSound();
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsWorking((prev) => !prev);
    setTime(isWorking ? 5 * 60 : 25 * 60);
  }

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./assets/mouse.mp3")
      );
      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(currentTime);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors[currentTime]
            ? colors[currentTime]
            : colors[0],
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: Platform.OS === "android" ? 30 : undefined,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          setTime={setTime}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
        />
        <Timer time={time} />

        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {isActive ? "Pause" : "Start"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleReset} >
          <Text style={{ color: "white", fontWeight: "bold" }}>Reset</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",
  },
});
