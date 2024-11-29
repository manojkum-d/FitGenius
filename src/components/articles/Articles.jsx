import { useState, useEffect } from "react";

const NewsComponent = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?category=health&apiKey=b0f9dfa17ed54f8dba5c022719197c1e"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // const articlesWithImages = data.articles.filter((article) => {
        //   if (!article.urlToImage) {
        //     console.log("Article without image:", article);
        //     return false; // Exclude articles without images
        //   }
        //   return true; // Include articles with images
        // });
        setNews(data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Top Health Headlines
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md overflow-hidden"
          >
            {article.urlToImage ? (
              <img
                className="w-full h-40 object-cover"
                src={article.urlToImage}
                alt={article.title}
                onError={(e) => (e.target.src = "fallback-image.jpg")}
              />
            ) : (
              <img
                className="w-full h-40 object-cover"
                src="fallback-image.jpg"
                alt="Fallback"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-700 mb-4">{article.description}</p>
              <a
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-3 rounded-md"
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsComponent;
