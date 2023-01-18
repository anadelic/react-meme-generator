import './App.css';
import { saveAs } from 'file-saver';
import { useState } from 'react';

export default function App() {
  const [meme, setMeme] = useState('buzz');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const url = topText
    ? `https://api.memegen.link/images/${meme}/${topText}/${bottomText}.jpg`
    : `https://api.memegen.link/images/${meme}`;

  const downloadImage = () => {
    saveAs(`https://api.memegen.link/images/${meme}`, 'meme');
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

        <section>
          <label>
            Meme template
            <input
              value={meme}
              onChange={(e) => setMeme(e.currentTarget.value)}
            />
          </label>

          <label>
            Top text
            <input
              value={topText}
              onChange={(event) => {
                setTopText(event.currentTarget.value);
              }}
            />
          </label>

          <label>
            Bottom text
            <input
              value={bottomText}
              onChange={(event) => {
                setBottomText(event.currentTarget.value);
              }}
            />
          </label>
        </section>
        <button onClick={downloadImage}>Download</button>
      </main>
    </body>
  );
}
