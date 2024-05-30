import { useRef, useState } from 'react';
import './Recorder.css'
const CoreRecorder = () => {
    const audioLinkRef = useRef<Blob[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [recordings, setRecordings] = useState<any>([]);

    const startRec = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e: any) => {
            //save the data
            audioLinkRef.current.push(e.data);

        }

        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioLinkRef.current, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setRecordings((prevRecs: string) => [...prevRecs, audioUrl]);
        }
        mediaRecorderRef.current?.start();
    }

    const stopRec = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
    }
    return (
        <div>
            <p className="heading">Voice Recorder</p>
            <button onClick={startRec} className='btns'>Start Recording</button>
            <button onClick={stopRec} className='btns'>Stop Recording</button>
            {recordings.map((recUrl: string, index: number) => {
                return (
                    <div key={index}>
                        <audio controls src={recUrl} />
                        <a href={recUrl} download={`recording-${index}.wav`}>
                            download</a>
                    </div>
                )
            })}
        </div>
    )
}

export default CoreRecorder; 