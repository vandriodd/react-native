import { useEffect, useState } from "react";
import { getLatestGames } from "../lib/metacritic";
import { View, ActivityIndicator, FlatList } from "react-native";

// 1.1. Solution for Safe Area using SafeAreaView from react-native
// This approach is currently deprecated. One of the problems with this component is that it only worked on iOS, not on Android.
// So, it´s no longer fully recommended.
// import { SafeAreaView } from "react-native";

// Now, is better import it from "react-native-safe-area-context"

// 1.2 Solution for Safe Area using expo constants
// It´s not the best but it works for the StatusBar. As for the bottom line, not so much.
// import Constants from "expo-constants";

// 1.3 React Native Safe Area Context

import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "./Logo";
import AnimatedGameCard from "./GameCard";

export default function Main() {
  const [games, setGames] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLatestGames().then((games) => setGames(games));
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View style={{ marginBottom: 20 }}>
        <Logo />
      </View>
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
