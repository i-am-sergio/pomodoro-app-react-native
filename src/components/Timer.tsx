import { StyleSheet, Text, View } from "react-native";

const Timer = ({ time }: { time: any }) => {
  
  const formattime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${(minutes < 10 ? "0" : "") + minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }

  return (
    <View style={styles.container} >
      <Text style={styles.time} >{formattime(time)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 15,
  },
  time: {
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
  }
})

export default Timer;
