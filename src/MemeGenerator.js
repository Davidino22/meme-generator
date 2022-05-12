import React, { useEffect, useState } from 'react';

function MemeGenerator() {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
  });
  const [url, setUrl] = useState('https://api.memegen.link/templates/afraid');

  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        console.log(data);
        return data.blank;
      } catch (error) {
        console.log(error);
      }
    }
    fetchImage().then((data) => setImgSrc(data));
  }, [url]);

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button> New Image</button>
      </div>
      <div className="meme">
        <img src={imgSrc} alt="" />
        <br />
      </div>
    </main>
  );
}

export default MemeGenerator;
