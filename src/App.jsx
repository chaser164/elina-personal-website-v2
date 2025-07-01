import './App.css';
import { useRef } from 'react';
import doodleSplay1 from './assets/doodle_splay1.png';

function App() {
  const articlesRef = useRef(null);

  return (
    <>
      <div className="container">
        <div className="main-text">
          <span className="italic">Elina Choi </span>
          is a writer and entrepreneur interested in compelling <span className="italic">storytelling</span> and mission-driven startups.
          She enjoys creating at the <span className="italic">intersection</span> of technology, culture,
          and literary arts.
        </div>
        <img src={doodleSplay1} alt="doodle splay" className="doodle-splay" />
        <div className="spacer" />
        <div className="button-row">
          <a className="outline-btn" href="mailto:elinachoi524@gmail.com">MAIL</a>
          <a className="outline-btn" href="#writing">PUBLICATIONS</a>
          <a className="outline-btn" href="https://www.linkedin.com/in/elinachoi/">LINKEDIN</a>
        </div>
      </div>
      <div className="articles-section" ref={articlesRef} id="writing">
        <div className="main-text writing-title">Published Work & Translations</div>
        <div className="article-list">
        <a className="article-item" href="https://elinachoi.substack.com/" target="_blank" rel="noopener noreferrer">
            Substack: Edible Tongues
          </a>
          <a className="article-item" href="https://brownfashion.wixsite.com/fashionatbrowneditor/copy-of-williams-from-the-court-to-c-3" target="_blank" rel="noopener noreferrer">
            Creating "Underground" Fashion Media: A Conversation with Viv Chen
          </a>
          <a className="article-item" href="https://brownfashion.wixsite.com/fashionatbrowneditor/copy-of-the-golden-age-of-menswear" target="_blank" rel="noopener noreferrer">
            Capturing Nostalgia: Sarah Bouwman
          </a>
          <a className="article-item" href="https://campanthropology.org/2024/09/30/american-paranoia-media-narratives-of-ai-as-an-amoral-superman/" target="_blank" rel="noopener noreferrer">
            American Paranoia: Media Narratives of AI as an "Amoral Superman"
          </a>
          <a className="article-item" href="https://www.technologyreview.kr/why-air-conditioning-is-a-climate-antihero/" target="_blank" rel="noopener noreferrer">
            Why Air-Conditioning is a Climate Antihero
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
