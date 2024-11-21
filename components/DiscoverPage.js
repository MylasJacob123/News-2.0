import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

export default function DiscoverPage({ navigation }) {
  const [news, setNews] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredNews, setFilteredNews] = useState([]);
  const Api_Key = "eb4e653fa25f4157b50f017cbc200027";

  const categories = [
    "all",
    "business",
    "sports",
    "entertainment",
    "health",
    "science",
    "technology",
  ];

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const allNews = [];
        for (let category of categories) {
          if (category === "all") continue;
          const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${Api_Key}&pageSize=5`
          );
          const data = await response.json();
          if (data.status === "ok") {
            allNews.push(
              ...data.articles.map((article) => ({ ...article, category }))
            );
          }
        }
        setNews(allNews);
        setFilteredNews(allNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchAllNews();
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredNews(news);
    } else {
      const filtered = news.filter(
        (article) => article.category === activeCategory
      );
      setFilteredNews(filtered);
    }
  }, [activeCategory, news]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Discover</Text>
      <Text style={styles.subheader}>Get your news here</Text>
      <TextInput style={styles.searchInput} placeholder="Search news..." />

      <ScrollView horizontal={true} style={styles.tabContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.tab,
              activeCategory === category && styles.activeTab,
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text
              style={[
                styles.tabText,
                activeCategory === category && styles.activeTabText,
              ]}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {filteredNews.length > 0 ? (
        filteredNews.map((article, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("ArticlePage", {
                article,
              })
            }
          >
            <View style={styles.articleCard}>
              <Image
                resizeMode="cover"
                style={styles.secondImg}
                source={{
                  uri: article.urlToImage || "https://via.placeholder.com/150",
                }}
              />
              <View style={styles.articleTextContainer}>
                <Text style={styles.articleCategory}>
                  {article.category}
                </Text>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleSource}>
                  Source: {article.source.name || "Unknown"}
                </Text>
                <Text style={styles.articleCardParagraph}>
                  {article.publishedAt || "No date available"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.articleCardNoDataText}>
          No news available for this category.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginTop: 22,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 3,
  },
  subheader: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    fontSize: 14,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f4f4f4",
    marginRight: 10,
    marginBottom: 10,
  },
  activeTab: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  tabText: {
    fontSize: 14,
    color: "#333",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  articleCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  secondImg: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#ddd",
  },
  articleTextContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 6,
    width: "100%",
  },
  articleSource: {
    fontSize: 13,
    color: "#888",
  },
  articleCategory: {
    fontSize: 12,
    color: "#007BFF",
    fontWeight: "500",
  },
  articleCardParagraph: {
    fontSize: 12,
    color: "#555",
  },
  articleCardNoDataText: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginTop: 16,
  },
});
