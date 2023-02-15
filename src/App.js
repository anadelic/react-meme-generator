import './App.css';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';

export default function App() {
  const [meme, setMeme] = useState('worst');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [apiData, setApiData] = useState([]);

  // main Url
  const url = topText
    ? `https://api.memegen.link/images/${meme}/${topText}/${bottomText}.jpg`
    : `https://api.memegen.link/images/${meme}/_/${bottomText}.jpg`;

  // Downloading function
  const downloadImage = () => {
    saveAs(
      `https://api.memegen.link/images/${meme}/${topText}/${bottomText}`,
      'meme',
    );
  };
  // Getting memes id from Api for drop-down list
  useEffect(() => {
    fetch('https://api.memegen.link/templates')
      .then((res) => res.json())
      .then((res) => setApiData(res))
      .catch(() => console.log('Error'));
  }, []);

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
              {apiData.map((image) => (
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
