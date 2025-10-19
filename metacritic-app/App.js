import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { getLatestGames } from "./lib/metacritic";

export default function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getLatestGames().then((games) => setGames(games));
  }, []);

  console.log(games);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {games.map((game) => (
        <View key={game.slug} style={styles.card}>
          <Image source={{ uri: game.image }} style={styles.image} />
          <Text style={styles.title}>{game.title}</Text>
          <Text style={styles.description}>{game.description}</Text>
          <Text style={styles.score}>{game.score}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    marginBottom: 10,
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
  },

  description: {
    fontSize: 16,
    color: "#fff",
  },

  score: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginTop: 10,
  },
});
