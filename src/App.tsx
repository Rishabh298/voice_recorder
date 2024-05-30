import { useState } from 'react'
import './App.css'
import { AudioRecorder } from 'react-audio-voice-recorder';



function App() {
  const [audioUrl, setAudioUrl] = useState<string>("");

  const addAudioElement = (blob: any) => {

    const url = URL.createObjectURL(blob);
    const audio = document.createElement('a');
    audio.style.display = 'none';
    audio.href = url;
    setAudioUrl(url);
    console.log(url, 'AUDIOLINK');
    audio.download = 'audio.wav'
    audio.click();
  };

  return (
    <div>
      <p className="heading">React Recording</p>

      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadFileExtension="wav"
        showVisualizer={true}
      />
    </div>
  )
}

export default App
