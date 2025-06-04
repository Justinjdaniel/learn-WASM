import { FFmpeg } from '@ffmpeg/ffmpeg';
import { useEffect, useState } from 'react';
import './App.css';

const ffmpeg = new FFmpeg();

function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState<File | undefined>();
  const [gif, setGif] = useState('');

  const load = async () => {
    ffmpeg.setLogging(true);
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  const convertToGif = async () => {
    if (!video) {
      alert('Please select a video file first.');
      return;
    }
    // Write the file to memory
    const fileData = await video.arrayBuffer();
    await ffmpeg.writeFile('test.mp4', new Uint8Array(fileData));

    // Run the FFMpeg command
    await ffmpeg.exec([
      '-i',
      'test.mp4',
      '-t',
      '2.5',
      '-ss',
      '2.0',
      '-f',
      'gif',
      'out.gif'
    ]);

    // Read the result
    const data = await ffmpeg.readFile('out.gif');

    // Create a URL
    const url = URL.createObjectURL(
      new Blob([data], { type: 'image/gif' })
    );
    setGif(url);
  };

  return ready ? (
    <div className="App">
      {video && (
        <video controls width="250" src={URL.createObjectURL(video)}></video>
      )}
      <label>Upload File</label>
      <input
        type="file"
        placeholder="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0)
            setVideo(e.target.files[0]);
        }}
      />

      <h3>Result</h3>

      <button onClick={convertToGif} disabled={!video}>Convert</button>

      {gif && <img src={gif} width="250" alt="" />}
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default App;
