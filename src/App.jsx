import { useState } from "react";
import { articles } from "./data";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");

  const highlight = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

 
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.content.toLowerCase().includes(query.toLowerCase())
  );

  
  const clearSearch = () => setQuery("");

  return (
    <div className="container">
      {/* Info Box */}
      <div className="info-box">
        <p>
          <strong>bitsofcode.</strong> Articles on Frontend Development. All
          articles are written by{" "}
          <span className="author-name">Ire Aderinokun</span>, Frontend
          Developer and User Interface Designer.
        </p>
        <div className="followers">
          <span className="twitter-handle">Follow: @ireaderinokun</span>
          <span className="followers-count">19.1K followers</span>
        </div>
      </div>
      {/* Search Section */}
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search articles..."
          className="search-box"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className={`clear-btn ${query ? "visible" : ""}`}
          onClick={clearSearch}
        >
          ×
        </button>
      </div>

      {/* Count */}
      <p className="results-count">
        <span className="highlight-count">{filteredArticles.length} posts</span>{" "}
        were found.
      </p>

      {/* Articles */}
      {filteredArticles.map((article, index) => (
        <div className="article" key={index}>
          <h2
            dangerouslySetInnerHTML={{
              __html: highlight(article.title),
            }}
          />
          <div className="article-date">{article.date}</div>
          <p
            dangerouslySetInnerHTML={{
              __html: highlight(article.content),
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
