import './App.css';
import axios from 'axios';
import FileSaver from 'file-saver';
import { useEffect, useState } from 'react';

function App() {
  const [templates, setTemplates] = useState([]);
  const [drop, setDrop] = useState('');
  const [url, setUrl] = useState('');
  const [toptext, setToptext] = useState('');
  const [bottomtext, setBottomtext] = useState('');
  const [image, setImage] = useState(
    'https://api.memegen.link/images/aag/foo/bar.png',
  );
  const saveFile = () => {
    FileSaver.saveAs(image, 'meme.png');
  };
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('https://api.memegen.link/templates');
        setTemplates(result.data);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    })().catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <div className="container">
      <select
        onChange={(event) => {
          setDrop(event.currentTarget.value);
        }}
      >
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
      <img
        style={{
          height: '500px',
          margin: '50px 0 30px 0',
        }}
        src={image}
        alt=""
      />
      <form className="">
        <label>
          Top Text :
          <input
            value={toptext}
            onChange={(event) => {
              setToptext(event.currentTarget.value);
            }}
          />
        </label>

        <label>
          Bottom Text:
          <input
            value={bottomtext}
            onChange={(event) => {
              setBottomtext(event.currentTarget.value);
            }}
          />
        </label>
      </form>
      <button
        className="btn"
        onClick={() => {
          setImage(
            `https://api.memegen.link/images/${drop}/${toptext}/${bottomtext}.png`,
          );
        }}
      >
        Generate
      </button>{' '}
      <button
        onClick={() => {
          console.log(image);
          setImage(image);
          saveFile();
        }}
      >
        Download
      </button>
    </div>
  );
}
export default App;
