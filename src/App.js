import './App.css';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useState } from 'react';

export default function App() {
  const [meme, setMeme] = useState('worst');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memes, setMemes] = useState([]);

  axios
    .get('https://api.memegen.link/templates/')
    .then(function (response) {
      setMemes(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  const url = topText
    ? `https://api.memegen.link/images/${meme}/${topText
        .replace('?', '~q')
        .replace('#', '~h')}/${bottomText}`
    : `https://api.memegen.link/images/${meme}.jpg`;

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
            <select
              value={meme}
              onChange={(e) => setMeme(e.currentTarget.value)}
            >
              {memes.map((image) => (
                <option value={image.id} key={image.id}>
                  {image.id}
                </option>
              ))}
            </select>
          </label>

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
              onChange={(e) => {
                setTopText(e.currentTarget.value);
              }}
            />
          </label>

          <label>
            Bottom text
            <input
              value={bottomText}
              onChange={(e) => {
                setBottomText(e.currentTarget.value);
              }}
            />
          </label>
        </section>
        <button onClick={downloadImage}>Download</button>
      </main>
    </body>
  );
}
