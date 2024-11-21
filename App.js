import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from "./components/HomePage";
import DiscoverPage from "./components/DiscoverPage";
import ArticlePage from "./components/ArticlePage"

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DiscoverPage"
          component={DiscoverPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ArticlePage"
          component={ArticlePage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}