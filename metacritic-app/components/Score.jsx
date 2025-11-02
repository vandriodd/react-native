import { Text, View, StyleSheet } from "react-native";

export default function Score({ score, maxScore = 100 }) {
  const getColors = () => {
    const percentage = (score / maxScore) * 100;

    if (percentage < 40) return "#ff3e3e";
    if (percentage < 65) return "#ffba00";
    return "#00c851";
  };

  return (
    <View style={[styles.scoreWrapper, { backgroundColor: getColors() }]}>
      <Text style={styles.scoreText}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scoreWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
