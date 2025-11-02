import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { getLatestGames } from "../lib/metacritic";
import { View, ActivityIndicator, FlatList, Text } from "react-native";

// 1.1. Solution for Safe Area using SafeAreaView from react-native
// This approach is currently deprecated. One of the problems with this component is that it only worked on iOS, not on Android.
// So, it´s no longer fully recommended.
// import { SafeAreaView } from "react-native";

// Now, is better import it from "react-native-safe-area-context"

// 1.2 Solution for Safe Area using expo constants
// It´s not the best but it works for the StatusBar. As for the bottom line, not so much.
// import Constants from "expo-constants";

// 1.3 React Native Safe Area Context

import Logo from "./Logo";
import AnimatedGameCard from "./GameCard";

export default function Main() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getLatestGames().then((games) => setGames(games));
  }, []);

  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <Logo />
      </View>

      <Link href="/about" style={{ marginBottom: 20, color: "#fff" }}>
        <Text>Ir al about</Text>
      </Link>

      {games.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        // <ScrollView>
        //   {games.map((game) => (
        //     <GameCard key={game.slug} game={game} />
        //   ))}
        // </ScrollView>

        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        />
      )}
    </View>
  );
}
