import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];

const Header = ({
  setTime,
  currentTime,
  setCurrentTime,
}: {
  setTime: any;
  currentTime: string;
  setCurrentTime: any;
}) => {
  const handlePress = (index: number) => {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {options.map((item, index: any) => (
        <TouchableOpacity
          key={index}
          style={[styles.itemStyle,currentTime !== index && {borderColor: "transparent"} ]}
          onPress={() => handlePress(index)}
        >
          <Text style={{fontWeight: "bold"}} >{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    width: "33.3%",
    alignItems: "center",
    borderWidth: 3,
    padding: 5,
    borderRadius: 10,
    borderColor: "white",
    marginVertical: 20
    ,
  },
});

export default Header;
