import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  ImageBackground,
} from "react-native";

export default function HomePage({ navigation }) {
  const [news, setNews] = useState([]);
  const Api_Key = "eb4e653fa25f4157b50f017cbc200027";

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${Api_Key}&pageSize=5`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setNews(data.articles);
        }
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.newsSection}>
          <View style={styles.topOfView}>
            <Text style={styles.header}>Breaking News</Text>
            <TouchableOpacity>
              <Text
                style={styles.redirectText}
                onPress={() => navigation.navigate("DiscoverPage")}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={true}>
            {news.length > 0 ? (
              news.map((menu, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate("ArticlePage", {
                      article: menu,
                    })
                  }
                >
                  <View style={styles.card}>
                    <ImageBackground
                      resizeMode="cover"
                      style={styles.img}
                      source={{
                        uri:
                          menu.urlToImage || "https://via.placeholder.com/150",
                      }}
                    >
                      <View style={styles.textOverlay}>
                        <Text style={styles.paragraph}>Source: {menu.source.name}</Text>
                        <Text style={styles.paragraph}>{menu.title}</Text>
                        <Text style={styles.paragraph}>
                          {menu.category || "General"}
                        </Text>
                      </View>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noDataText}>No breaking news available.</Text>
            )}
          </ScrollView>
        </View>

        <View style={styles.newsSection}>
          <View style={styles.topOfView}>
            <Text style={styles.header}>Recommended</Text>
            <TouchableOpacity>
              <Text
                style={styles.redirectText}
                onPress={() => navigation.navigate("DiscoverPage")}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            {news.length > 0 ? (
              news.map((menu, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate("ArticlePage", {
                      article: menu,
                    })
                  }
                >
                  <View style={styles.secondCard}>
                    <Image
                      resizeMode="cover"
                      style={styles.secondImg}
                      source={{
                        uri:
                          menu.urlToImage || "https://via.placeholder.com/150",
                      }}
                    />
                    <View style={styles.secondCardTextContainer}>
                      <Text style={styles.secondCardParagraph1}>
                        {menu.title}
                      </Text>
                      <Text style={styles.secondCardParagraph}>
                        Source: {menu.source.name}
                      </Text>
                      <Text style={styles.secondCardParagraph}>
                        {menu.publishedAt}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.secondCardNoDataText}>
                No recommended news available.
              </Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingHorizontal: 15,
    height: 100,
  },
  scrollView: {
    flex: 1,
  },
  newsSection: {
    marginBottom: 20,
  },
  topOfView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 11,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  redirectText: {
    color: "blue",
    marginTop: 5,
    fontSize: 19,
  },
  card: {
    width: 280,
    height: 200,
    marginHorizontal: 10,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 20,
  },
  img: {
    flex: 1,
    justifyContent: "flex-end",
  },
  textOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  cardText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 14,
    color: "white",
  },
  textContainer: {
    padding: 10,
  },
  noDataText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },

  secondCard: {
    flexDirection: "row",
    width: "97%",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  secondImg: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  secondCardTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  secondCardCardText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  secondCardParagraph: {
    fontSize: 12,
    color: "#555",
  },
  secondCardParagraph1: {
    marginBottom: 5,
    width: "98%",
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  secondCardNoDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    padding: 10,
  },
});
