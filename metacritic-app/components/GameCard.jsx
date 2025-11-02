import { useEffect, useRef } from "react";
import { Image, Text, View, StyleSheet, Animated } from "react-native";
import Score from "./Score";

function GameCard({ game }) {
  return (
    <View key={game.slug} style={styles.card}>
      <Image source={{ uri: game.image }} style={styles.image} />
      <Text style={styles.title}>{game.title}</Text>
      <Score score={game.score} />
      <Text style={styles.description}>
        {game.description.slice(0, 100)}...
      </Text>
    </View>
  );
}

export default function AnimatedGameCard({ game, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <GameCard game={game} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 42,
    flexDirection: "row",
    backgroundColor: "#1e1e1e",
    padding: 4,
    borderRadius: 10,
    gap: 12,
    marginBottom: 20,
  },

  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    marginTop: 10,
  },

  description: {
    marginTop: 8,
    flexShrink: 1,
    fontSize: 16,
    color: "#fff",
  },

  score: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
});
