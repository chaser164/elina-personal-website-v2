import './App.css';
import { useRef, useState, useEffect } from 'react';
import doodleSplay1 from './assets/doodle_splay1.png';
import doodleSplayMini from './assets/doodle_splay_mini.png';

// Just use the image URL directly - user should provide direct image links
// (from ImgBB, Cloudinary, etc.)

function App() {
  const articlesRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/.netlify/functions/data-source');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <>
      <div className="container">
        <div className="main-text">
          <span className="italic">Elina Choi </span>
          is a writer and entrepreneur interested in compelling <span className="italic">storytelling</span> and mission-driven startups.
          She enjoys creating at the <span className="italic">intersection</span> of technology, culture,
          and literary arts.
        </div>
        <img
          src={isMobile ? doodleSplayMini : doodleSplay1}
          alt="doodle splay"
          className="doodle-splay"
        />
        <div className="spacer" />
        <div className="button-row">
          <a className="outline-btn" href="mailto:elinachoi524@gmail.com">MAIL</a>
          <a className="outline-btn" href="#writing">PUBLICATIONS</a>
          <a className="outline-btn" href="https://www.linkedin.com/in/elinachoi/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
        </div>
      </div>
      <div className="articles-section" ref={articlesRef} id="writing">
        <div className="main-text writing-title">Published Work & Translations</div>
        <div className="article-grid">
          {loading ? (
            <div className="loading">Loading articles...</div>
          ) : (
            articles.map((article, index) => (
              <a 
                key={index} 
                className="article-card" 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="article-image"
                  onError={(e) => {
                    console.error('Image failed to load:', article.image);
                    e.target.style.display = 'none';
                  }}
                />
                <div className="article-content">
                  <div className="article-publisher">{article.source}</div>
                  <div className="article-divider"></div>
                  <h3 className="article-title">{article.title}</h3>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
