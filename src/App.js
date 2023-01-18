import './App.css';
import { saveAs } from 'file-saver';
import { useState } from 'react';

export default function App() {
  const [meme, setMeme] = useState('doge');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const url = topText
    ? `https://api.memegen.link/images/${meme}/${topText}/${bottomText}.jpg`
    : `https://api.memegen.link/images/${meme}`;

  const downloadImage = () => {
    let url = `https://api.memegen.link/images/${meme}`;
    saveAs(url, 'meme');
  };

  return (
    <body className="App">
      <header>
        <h1> React Meme Generator </h1>
      </header>
      <main>
        <img
          src={url}
          className="memeImg"
          alt="meme"
          data-test-id="meme-image"
        />
        <label htmlFor="memeTemplate">
          Meme Template:
          <input
            name="memeTemplate"
            htmlFor="memeTemplate"
            value={meme}
            onChange={(e) => setMeme(e.currentTarget.value)}
          />
        </label>
        <label htmlFor="topText">
          Top text
          <input
            name="topText"
            value={topText}
            onChange={(event) => {
              setTopText(event.currentTarget.value);
            }}
          />
        </label>
        <label htmlFor="bottomText">
          Bottom text
          <input
            name="bottomText"
            value={bottomText}
            onChange={(event) => {
              setBottomText(event.currentTarget.value);
            }}
          />
        </label>
        <button onClick={downloadImage}>Download</button>
      </main>
    </body>
  );
}
