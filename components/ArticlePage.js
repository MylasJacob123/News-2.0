import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function ArticlePage({ route }) {
  const { article } = route.params;
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <ImageBackground
        source={{
          uri: article.urlToImage || "https://via.placeholder.com/150",
        }}
        style={styles.image}
      >
        <View style={styles.textOverlay}>
          <Text style={styles.title}>{article.title}</Text>
        </View>
      </ImageBackground>

      <View style={styles.contentContainer}>
        <Text style={styles.author}>{article.author || "Unknown Author"}</Text>
        <Text style={styles.publishedAt}>
          {new Date(article.publishedAt).toLocaleString()}
        </Text>
        <Text style={styles.content}>
          {article.content || article.description}
        </Text>
        <Text style={styles.source}>
          Source: <Text style={styles.sourceName}>{article.source.name}</Text>
        </Text>
        <TouchableOpacity 
          style={styles.link}
          onPress={() => navigation.navigate('WebView', { url: article.url })}
        >
          <Text style={styles.linkText}>Read full article</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    marginTop: 40,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 15,
    zIndex: 10,
    backgroundColor: "rgba(210, 210, 210, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  image: {
    justifyContent: "flex-end",
    width: "97%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    marginLeft: 10,
    margin: "auto",
    marginTop: 60,
  },
  textOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    padding: 10,
    width: "97%",
  },
  title: {
    fontSize: 22,
    fontWeight: "lighter",
    color: "white",
    textAlign: "center",
  },
  contentContainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  author: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
    marginBottom: 10,
  },
  publishedAt: {
    fontSize: 14,
    color: "#777",
    marginBottom: 15,
    textAlign: "right",
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 15,
  },
  source: {
    fontSize: 14,
    color: "#777",
    textAlign: "right",
  },
  sourceName: {
    fontWeight: "bold",
    color: "#000",
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    fontSize: 14,
    color: "#007bff",
    textAlign: "center",
  },
});
