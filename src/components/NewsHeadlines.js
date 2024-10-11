import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsHeadlines.css'; // Import the CSS file

const NewsHeadlines = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=b4a1ddbdcbf341ab87dd803ddf953127');
        setArticles(response.data.articles);
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError('Unable to fetch news headlines. Please try again later.');
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container"> {/* Add a container class for styling */}
      <h2>Latest News Headlines</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {articles.slice(0, 5).map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
              <p>Source: {article.source.name}</p>
              <p>Published on: {new Date(article.publishedAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsHeadlines;
